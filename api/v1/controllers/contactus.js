const ContactUsModel = require('./../../../models/contactus')
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
class ContactUs {
  async create(req, res) {
    try {
      const { body } = req
      validateMessage(body)
      let contactus = ContactUsModel(body)
      contactus = await contactus.save()
      __.success(res, contactus, 'Entry successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
}

module.exports = new ContactUs()
