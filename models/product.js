const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    actualPrice: {
      type: Number,
      required: true,
      default: 0
    },
    discountPrice: {
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
    volume:{
      type: String,
      // required: true
    },
    detailedLogo: {
      type: String,
      required: true,
      trim: true
    },
    measuringUnit: {
      type: String,
      // required: true,
      trim: true,
      // enum: ['ml', 'gms']
    },
    ingredient: {
      type: String,
      trim: true
    },
    dressing:{
      type: String,
      trim: true
    },
    goodness: {
      type: String,
      // required: true,
      trim: true
    },
    intention: {
      type: String,
      // required: true,
      trim: true
    },
    nutrient: {
      type: String,
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
