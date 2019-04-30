const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const emailValidator = [emailRegexp, 'Invalid Email']


const subscriptionSchema = Schema({
  email: {
    type: String,
    required: 'Email is required',
    trim: true,
    lowercase: true,
    unique: true,
    match: emailValidator
  },
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true })

const SubscriptionModel = mongoose.model('Subscription', subscriptionSchema)
module.exports = SubscriptionModel
