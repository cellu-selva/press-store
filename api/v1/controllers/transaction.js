'use strict'

const __ = require('../../../helpers/response')
const transactionModel = require('./../../../models/transaction')
const UserModel = require('./../../../models/user')



function validateTransaction(transaction) {
  let error
  switch(true) {
    case (!(transaction && transaction.paymentId)):
      error = new Error('Please provide paymentId')
      break
    case (!(transaction && transaction.gateway)):
      error = new Error('Please provide gateway')
      break
  }
  if (error) {
    error.status = 400
    throw error
  }
}

class Transaction {
  async createTransaction(req, res, next) {
    try {
      const { body, user } = req
      const { trans } = body
      validateTransaction(trans)
      trans.userId = user._id
      let transaction = new transactionModel(trans)
      transaction = await transaction.save()
      if(transaction.isSuccess) {
        req.transaction = transaction
        next()
      } else {
        __.success(res, transaction, 'transaction successfully created')
      }
    } catch (error) {
      __.error(res, error)
    }
  }

  async updateTransaction(req, res) {
    try {
      let { transaction, order, user } = req
      validateTransaction(transaction)
      transaction.userId = user._id
      transaction.orderId = order._id
      transaction = await transactionModel.findOneAndUpdate({
        _id: transaction._id
      }, transaction, {
        new: true
      })
      __.success(res, transaction, 'transaction successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
  async getTransactionById(req, res) {
    try {
      const { params: { transactionID } } = req
      if(!transactionID) {
        __.send(res, 400, 'Please send transaction id')
      }
      const transaction = await transactionModel.findOne({
        _id: transactionID,
        isDeleted: false
      })
      __.success(res, transaction, 'Transaction successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }

  async getTransactionByUser(req, res) {
    try {
      const { user } = req
      const transaction = await transactionModel.findOne({
        _id: user._id,
        isDeleted: false
      })
      __.success(res, transaction, 'Transaction successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }
}


const obj = new Transaction()
module.exports = obj
