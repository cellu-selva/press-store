const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = Schema({
    name: {
        type: String,
        required: true
    },
    addressLine1: {
      type: String,
      required: true
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    phoneExt: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    },
    addresses: {
      primaryAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
      },
      secondaryAddress: [{
        type: Schema.Types.ObjectId,
        ref: 'Address'
      }] 
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }

}, { timestamps: true })

const OrderModel = mongoose.model('Order', OrderSchema)
module.exports = OrderModel
