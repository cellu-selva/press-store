const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    code: {
      type: String,
      // required: true,
      // trim: true,
      lowercase: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    description: {
      type: String,
      // required: true,
      trim: true
    },
    logo: {
      type: String,
      required: true,
      trim: true
    },
    measuringUnit: {
      type: String,
      required: true,
      trim: true,
      enum: ['ml', 'grams', 'liter', 'kg']
    },
    ingredient: {
      type: String,
      trim: true
    },
    goodness: {
      type: String,
      // required: true,
      trim: true
    },
    intentions: {
      type: String,
      // required: true,
      trim: true
    },
    nutrient: {
      type: Schema.Types.Mixed,
      // required: true,
      trim: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
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

const ProductModel = mongoose.model('Product', ProductSchema)
module.exports = ProductModel
