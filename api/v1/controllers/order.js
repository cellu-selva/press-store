'use strict'

const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId
const _ = require('lodash')
const __ = require('../../../helpers/response')
const OrderModel = require('../../../models/order')
const ProductModel = require('../../../models/product')
const AddressModel = require('../../../models/address')
const CartModel = require('../../../models/cart')
const config = require('config')
const queue = require('./../../../helpers/queue')
const util = require('./../../../helpers/util')
const handlebars = require('handlebars');
const fs = require('fs');

const checkIfOrdersAreValid = function(cartIDs) {
  let error = false
  _.each(cartIDs, (cartId)=> {
    if(!objectId.isValid(cartId)) {
      error = true
    }
  })
  return error
}
const validateOrder = (data) => {
  let error
  switch (true) {
    case (!(data && data.address && objectId.isValid(data.address))):
      error = new Error('Please provide address')
      break
    case (!(data && data.cartIds && !checkIfOrdersAreValid(data.cartIds))):
      error = new Error('Please provide cart Ids')
      break
  }
  if (error) {
    error.status = 400
    throw error
  }
  return
}

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    }
    else {
      callback(null, html);
    }
  });
};



const calculatePrice = function(items) {
  let totalPrice = 0
  _.each(items, (item) => {
    totalPrice += item.totalPrice
  })
  return util.changeToPaisa(totalPrice)
}

const sendAlertMailForOrders = function(order, mailOption) {
  const to = config.get('alertEmail')
  _.each(to, (email) => {
    mailOption.to = email
    mailOption.html += config.get('protocol')+"://"+ config.get('host') + ":" + config.get('clientPort') +"/orders/"+ order._id
    queue.createJob('sendMail', mailOptions)
  })
}
class Order {
  async productInfo(cartIdems) {
    
  }

  async createOrder(req, res, next) {
    try {
      let address = '';
      let listOfProducts = [];
      const { body, user } = req
      const { orderObj } = body
      validateOrder(orderObj)
      await CartModel.update({ _id: { $in : orderObj.cartIds }, isDeleted: false }, { $set: { isBilled: true} }, { multi: true })
      const cartItems = await CartModel.find({ _id: { $in : orderObj.cartIds }, isDeleted: false })
      if(!cartItems.length) {
        return __.send(res, 400, 'cart Items not found')
      } else {
        address = await AddressModel.findOne({ _id: orderObj.address, isDeleted: false });

        for (let i = 0; i < cartItems.length; i++) {
          let temp = await ProductModel.findOne({ _id: { $in: cartItems[i].product }, isDeleted: false });
          listOfProducts.push(temp);
        }
      }
      orderObj.totalPrice = calculatePrice(cartItems)
      let order = new OrderModel(orderObj)
      order.user = user._id
      order.isDeleted = false
      order = await order.save()

       readHTMLFile('./templates/order.html', function (err, html) {
        handlebars.registerHelper('PRODUCTINFO', function (data) {
          var str = '';
          for (var i = 0; i < cartItems.length; i++) {
            str += '<tr>';
            str += `<td>${i + 1}</td><td>${listOfProducts[i]['name']}</td><td>${cartItems[i].quantity}</td><td>${listOfProducts[i]['discountPrice']}</td>`;
            str += '</tr>';
          };
          str += '';

          return new handlebars.SafeString(str);
        });
        
        var template = handlebars.compile(html);
        var replacements = {
          USERNAME: user.firstname,
          // PRODUCTINFO: productContent,
          ORDERID: order._id,
          ADDRESSLINE1: address['addressLine1'],
          ADDRESSLINE2: address['addressLine2'],
          CITY: address['city'],
          STATE: address['state'],
          PHONE: address['phone'],
          PINCODE: address['pincode'],
          BILLINGNAME: address['name'],
          TOTAL: '₹ ' + (orderObj.totalPrice / 100),
          DASHBOARD: "http://" + config.get('host') + ":" + config.get('clientPort') + "/my-orders"
        };
        var htmlToSend = template(replacements);
        let mailOptions = {
          to: user.email,
          subject: `Pressato - Order placed - #${order._id}`,
          html: htmlToSend
        }
        queue.createJob('sendMail', mailOptions)
        sendAlertMailForOrders(order, mailOptions);
      });
      // let mailOptions = {
      //   to: user.email,
      //   subject: `Order placed - #${order._id}`,
      //   html: 'Hi, You\'re order has been placed successfully <br>. Click on the link below to check your order.<br/><br/><br/><br/> '
      // }
      // mailOptions.html += "http://"+ config.get('host') + ":" + config.get('clientPort') +"/my-orders"
      // queue.createJob('sendMail', mailOptions)
      // sendAlertMailForOrders(order, mailOptions);
      /*****For admin end */
      let adminMailOptions = {
        to: 'Subs@pressato.in',
        subject: `Order Received - #${ order._id }`,
        html: `Hi, ${user.firstname} has placed an order - #${order._id} <br>. Click on the link below to check order details.<br/><br/><br/><br/> `
      }
      adminMailOptions.html += "http://" + config.get('host') + ":" + config.get('clientPort') + "/admin-dashboard"
      queue.createJob('sendMail', adminMailOptions)
      /******** */
      
      req.order = order
      next()
    } catch (error) {
      __.error(res, error)
    }
  }

  async getOrderById(req, res) {
    try {
      const { params: { orderId } } = req
      if(!(orderId || objectId.isValid(orderId))) {
        __.send(res, 400, 'Please send order id')
      }
      const order = await OrderModel.findOne({
        _id: orderId,
        isDeleted: false
      })
      __.success(res, order, 'order successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }
  async getOrderByUserId(req, res) {
    try {
      const { user } = req
      // if(!(userId || objectId.isValid(userId))) {
      //   __.send(res, 400, 'Please send user id')
      // }
      
      const orders = await OrderModel.find({
        user: user._id,
        isDeleted: false
      }).populate('address cartIds')
      __.success(res, orders, 'Orders successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }

  async getAllOrders(req, res, user) {
    try {
      const { params, user } = req
      if(!user.isAdmin) {
        __.send(res, 403, 'Not a authorized user');
        return;
      }
      const { page, limit } = params
      const count = await OrderModel.count({})
      const orders = await OrderModel.find({}).populate('user address').sort('-createdAt').limit(limit).skip(page*limit)
      __.success(res, { orders, count }, 'Orders successfully fetched')
    } catch (error) {
      console.log(`Error while fetching orders...`, error)
      __.error(res, error)
    }
  }
  
}



const obj = new Order()
module.exports = obj
