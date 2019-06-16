'use strict'

const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId
const _ = require('lodash')
const __ = require('../../../helpers/response')
const CartModel = require('../../../models/cart')
const ProductModel = require('../../../models/product')
const MinPurchaseToAvailShippingCost = 250
const validateCart = (data) => {
  let error
  switch (true) {
    case (!(data && data.quantity && data.quantity.constructor === Number )):
      error = new Error('Please provide quantity')
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


class Cart {
  async createCart(req, res) {
    try {
      const { body, user } = req
      validateCart(body)
      const product = await ProductModel.findOne({ _id: body.product, isDeleted: false })
      if(!product) {
        return __.send(res, 400, 'Product not found')
      }
      body.totalPrice = product.discountPrice * body.quantity
      let cart = new CartModel(body)
      cart.user = user._id
      cart.isDeleted = false
      cart = await cart.save()
      __.success(res, cart, 'cart successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
  async updateCartById(req, res) {
    try {
      const { params: { cartId }, body } = req
      validateCart(body)
      if (!body._id || (cartId != body._id)) {
        return __.send(res, 400, 'Please send an cart id to update')
      }
      body.isDeleted = false
      const condition = {
        _id: cartId,
        isDeleted: false
      }
      const cart = await CartModel.findOneAndUpdate(condition, body, { new: true })
      __.success(res, cart, 'cart successfully updated')
    } catch (error) {
      __.error(res, error)
    }
  }

  async deleteCartById(req, res) {
    try {
      const { params: { cartId }, user } = req
      if (!objectId.isValid(cartId)) {
        return __.send(res, 400, 'Please send cart id to delete')
      }
      let cart = await CartModel.findOne({ _id: cartId, isDeleted: false })
      if(!cart) {
        return __.send(res, 404, 'cart not found')
      }
      const condition = {
        _id: cartId,
        isDeleted: false
      }
      cart.isDeleted = true
      cart.deletedAt = new Date()
      cart.deletedBy = user
      cart = await CartModel.findOneAndUpdate(condition, cart, { new: true })
      __.success(res, cart, 'cart successfully deleted')
    } catch (error) {
      __.error(res, error)
    }
  }

  async getCartById(req, res) {
    try {
      const { params: { cartId } } = req
      if(!(cartId || objectId.isValid(cartId))) {
        __.send(res, 400, 'Please send cart id')
      }
      const cart = await CartModel.findOne({
        _id: cartId,
        isDeleted: false
      })
      __.success(res, cart, 'cart successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }
  async getCartByUserId(req, res) {
    try {
      const { user } = req
      const cartObj = {
        isShippingFree: true,
        totalPrice: 0,
        deliveryCharge: 0
      }
      
      cartObj.carts = await CartModel.find({
        user: user._id,
        isDeleted: false,
        isBilled: false
      })
      _.each(cartObj.carts, (item)=> {
        cartObj.totalPrice += item.totalPrice
      })
      if(cartObj.totalPrice < MinPurchaseToAvailShippingCost) {
        cartObj.isShippingFree = false
        cartObj.deliveryCharge = 150 * 100
      }
      cartObj.totalPrice = cartObj.totalPrice * 100
      __.success(res, cartObj, 'Cart successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }
}

const obj = new Cart()
module.exports = obj
