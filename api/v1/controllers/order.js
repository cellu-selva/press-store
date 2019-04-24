'use strict'

const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

const __ = require('../../../helpers/response')
const OrderModel = require('./../../../models/order')
const ProductModel = require('./../../../models/product')

const validateOrder = (data) => {
  let error
  switch (true) {
    case (!(data && (data.isBilled === true || data.isBilled === false) && data.isBilled.constructor === Boolean )):
      error = new Error('Please provide isBilled')
      break
    case (!(data && data.quantity && data.quantity.constructor === Number )):
      error = new Error('Please provide quantity')
      break
    // case (!(data && data.address && objectId.isValid(data.address))):
    //   error = new Error('Please provide address')
    //   break
    case (!(data && data.user && objectId.isValid(data.user))):
      error = new Error('Please provide user')
      break
    case (!(data && data.product && objectId.isValid(data.product))):
      error = new Error('Please provide product')
      break
  }
  if (error) {
    error.status = 400
    throw error
  }
  return
}


class Order {
  async createOrder(req, res) {
    try {
      const { body, user } = req
      validateOrder(body)
      const product = await ProductModel.findOne({ _id: body.product, isDeleted: false })
      if(!product) {
        return __.send(res, 400, 'Product not found')
      }
      body.price = product.price * body.quantity
      let order = new OrderModel(body)
      order.user = user._id
      order.isDeleted = false
      order.addedAt = new Date()
      order = await order.save()
      __.success(res, order, 'Order successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
  async updateOrderById(req, res) {
    try {
      const { params: { orderId }, body } = req
      validateOrder(body)
      if (!body._id || (orderId != body._id)) {
        return __.send(res, 400, 'Please send an order id to update')
      }
      body.isDeleted = false
      const condition = {
        _id: orderId,
        isDeleted: false
      }
      const order = await OrderModel.findOneAndUpdate(condition, body, { new: true })
      __.success(res, order, 'Order successfully updated')
    } catch (error) {
      __.error(res, error)
    }
  }

  async deleteOrderById(req, res) {
    try {
      const { body, user } = req
      if (!(body._id || objectId.isValid(body._id))) {
        return __.send(res, 400, 'Please send order id to delete')
      }
      const condition = {
        _id: body._id,
        isDeleted: false
      }
      body.isDeleted = true
      body.deletedAt = new Date()
      body.deletedBy = user
      const order = await OrderModel.findOneAndUpdate(condition, body, { new: true })
      __.success(res, order, 'Order successfully deleted')
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
      __.success(res, order, 'Order successfully fetched')
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
      __.success(res, orders, 'Order successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }
}


const obj = new Order()
module.exports = obj
