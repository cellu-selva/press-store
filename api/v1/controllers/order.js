'use strict'

const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId
const _ = require('lodash')
const __ = require('../../../helpers/response')
const OrderModel = require('../../../models/order')
const CartModel = require('../../../models/cart')

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

const calculatePrice = function(items) {
  let totalPrice = 0
  _.each(items, (item) => {
    totalPrice += item.totalPrice
  })
  return totalPrice
}
class Order {
  async createOrder(req, res) {
    try {
      const { body, user } = req
      validateOrder(body)
      const cartItems = await CartModel.find({ _id: {
        $in : body.cartIds
      }, isDeleted: false })
      if(!cartItems.length) {
        return __.send(res, 400, 'cart Items not found')
      }
      body.totalPrice = calculatePrice(cartItems)
      let order = new OrderModel(body)
      order.user = user._id
      order.isDeleted = false
      order = await order.save()
      __.success(res, order, 'cart successfully created')
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
      const { params: { userId } } = req
      if(!(userId || objectId.isValid(userId))) {
        __.send(res, 400, 'Please send user id')
      }
      const orders = await OrderModel.find({
        user: userId,
        isDeleted: false
      })
      __.success(res, orders, 'Orders successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }
}


const obj = new Order()
module.exports = obj
