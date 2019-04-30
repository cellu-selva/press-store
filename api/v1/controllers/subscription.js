const SubscriptionModel = require('./../../../models/subscription')
const __ = require('../../../helpers/response')

function validateMessage(data) {
  let error
  switch(true) {
    case(!(data && data.email)):
      error = new Error('Email is required')
      break
    case (!(data && data.name)): 
      error = new Error('name is required')
      break
  }
  if(error) {
    error.status = 400
    throw error
  }
}
class Subscription {
  async create(req, res) {
    try {
      const { body } = req
      validateMessage(body)
      let subscription = SubscriptionModel(body)
      subscription = await subscription.save()
      __.success(res, subscription, 'Entry successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
}

module.exports = new Subscription()
