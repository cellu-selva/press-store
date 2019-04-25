const express = require('express')
const app = express.Router()
const admin = require('../middlewares/admin')
const auth = require('../middlewares/auth')
const orderController = require('./../controllers/order')

app.post('/order', auth.authenticate, orderController.createOrder)
app.get('/order/:orderId', auth.authenticate, orderController.getOrderById)
app.get('/order/user/:userId', auth.authenticate, orderController.getOrderByUserId)
// app.put('/order/:orderId', auth.authenticate, orderController.updateOrderById)
// app.delete('/order/:orderId', auth.authenticate, orderController.deleteOrderById)

module.exports = app
