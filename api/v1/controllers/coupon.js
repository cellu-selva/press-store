'use strict'

const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

const __ = require('../../../helpers/response')
const CouponModel = require('./../../../models/coupon')

const validateCoupon = (data) => {
  let error
  switch (true) {
    case (!(data && (data.coupon) && data.coupon.constructor === String )):
      error = new Error('Please provide coupon')
      break
    case (!(data && data.discountPercentage && data.discountPercentage.constructor === Number )):
      error = new Error('Please provide discountPercentage')
      break
    case (!(data && data.maxDiscount && data.maxDiscount.constructor === Number )):
      error = new Error('Please provide maxDiscount')
      break
    case (!(data && data.minPurchaseValue && data.minPurchaseValue.constructor === Number )):
      error = new Error('Please provide minPurchaseValue')
      break
    case (!(data && data.noOfRedeem && data.noOfRedeem.constructor === Number )):
      error = new Error('Please provide noOfRedeem')
      break
    case (!(data && data.expiryDate && data.expiryDate.constructor === Date )):
      error = new Error('Please provide expiryDate')
      break
    case (!(data && data.category && data.category.constructor === Number )):
      error = new Error('Please provide category')
      break
  }
  if (error) {
    error.status = 400
    throw error
  }
  return
}


class Coupon {
  async createCoupon(req, res) {
    try {
      const { body } = req
      validateCoupon(body)
      body.createdBy = user
      let coupon = new CouponModel(body)
      coupon = await coupon.save()
      __.success(res, coupon, 'Coupon successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
  async updateCouponById(req, res) {
    try {
      const { params: { couponId }, body } = req
      validateCoupon(body)
      if (!body._id || (couponId != body._id)) {
        return __.send(res, 400, 'Please send an coupon id to update')
      }
      body.isDeleted = false
      const condition = {
        _id: couponId,
        isDeleted: false
      }
      const coupon = await CouponModel.findOneAndUpdate(condition, body, { new: true })
      __.success(res, coupon, 'Coupon successfully updated')
    } catch (error) {
      __.error(res, error)
    }
  }

  async deleteCouponById(req, res) {
    try {
      const { params: { couponId }, user } = req
      if (!objectId.isValid(couponId)) {
        return __.send(res, 400, 'Please send coupon id to delete')
      }
      let coupon = await couponModel.findOne({ _id: couponId, isDeleted: false })
      if(!coupon) {
        return __.send(res, 404, 'coupon not found')
      }
      const condition = {
        _id: couponId,
        isDeleted: false
      }
      coupon.isDeleted = true
      coupon.deletedAt = new Date()
      coupon.deletedBy = user
      coupon = await CouponModel.findOneAndUpdate(condition, coupon, { new: true })
      __.success(res, coupon, 'Coupon successfully deleted')
    } catch (error) {
      __.error(res, error)
    }
  }

  async getCouponById(req, res) {
    try {
      const { params: { couponId } } = req
      if(!(couponId || objectId.isValid(couponId))) {
        __.send(res, 400, 'Please send coupon id')
      }
      const coupon = await CouponModel.findOne({
        _id: couponId,
        isDeleted: false
      })
      __.success(res, coupon, 'Coupon successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }
}


const obj = new Coupon()
module.exports = obj
