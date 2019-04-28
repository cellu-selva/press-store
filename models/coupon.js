const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CouponSchema = Schema({
  coupon: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String
  },
  discountPercentage: {
    type: Number,
    required: true
  },
  maxDiscount: {
    type: Number,
    required: true
  },
  minPurchaseValue: {
    type: Number,
    required: true
  },
  noOfRedeem: {
    type: Number,
    required: true
  },
  totalReddemSoFar: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  category: {
    type: Number,
    min: 1,
    max: 5
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  }

}, { timestamps: true })

const CouponModel = mongoose.model('Coupon', CouponSchema)
module.exports = CouponModel
