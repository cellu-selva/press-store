const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSummarySchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    stockLeft: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const stockSummaryModel = mongoose.model('StockSummary', stockSummarySchema)
module.exports = stockSummaryModel
