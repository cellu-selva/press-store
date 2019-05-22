const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = Schema({
  paymentId: {
    type: String,
    required: true
  },
  isSuccess: {
    type: Boolean,
    required: true
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },
  gateway: {
    type: String,
    required: true
  },
  razorData: {
    type: String
  }
}, { timestamps: true })

const TransactionModel = mongoose.model('Transaction', TransactionSchema)
module.exports = TransactionModel
