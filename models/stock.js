const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 0
    },
    budget: {
      type: Number,
      default: 0
    }

}, { timestamps: true })

const stockSummaryModel = mongoose.model('StockSummary', stockSchema)
module.exports = stockSummaryModel
