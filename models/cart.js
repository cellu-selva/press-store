const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = Schema({
    quantity: {
      type: Number,
      required: true
    },
    isBilled: {
      type: Boolean,
      default: false
    },
    totalPrice: {
      type: Number,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    },
    productMeta: {
      type: [Schema.Types.ObjectId],
      ref: 'Product',
      default: []
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required:true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required:true
    }

}, { timestamps: true })

const CartModel = mongoose.model('Cart', CartSchema)
module.exports = CartModel
