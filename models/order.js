const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = Schema({
    isBilled: {
        type: Boolean,
        required: true,
        default: false
    },
    quantity: {
      type: Number,
      required: true
    },
    additionalNotes: {
      type: String
    },
    orderDate: {
      type: Date
    },
    addedAt: {
      type: Date,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }

}, { timestamps: true })

const OrderModel = mongoose.model('Order', OrderSchema)
module.exports = OrderModel
