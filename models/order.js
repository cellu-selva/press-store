const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = Schema({
    totalPrice: {
      type: Number,
      required: true
    },
    orderIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    }],
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true
    },
    // transcation: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Transcation',
    //   required: true
    // },
    coupon: {
      type: Schema.Types.ObjectId,
      ref: 'Coupon'
    },
    additionalNote: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required:true
    }

}, { timestamps: true })

const OrderModel = mongoose.model('Order', OrderSchema)
module.exports = OrderModel
