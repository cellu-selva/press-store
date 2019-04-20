const express = require('express')
const app = express.Router()
const admin = require('./../middlewares/admin')
const auth = require('./../middlewares/auth')
const productController = require('./../controllers/product')

app.post('/products', auth.authenticate, admin.isAdmin, productController.createProduct)
app.get('/products', productController.getAllProduct)
app.get('/products/:productId', productController.getAllProduct)
app.put('/products/:productId', auth.authenticate, admin.isAdmin, productController.updateProductById)
app.delete('/products/:productId', auth.authenticate, admin.isAdmin, productController.deleteProductById)
app.get('/products/category/:categoryId', productController.getProductByCategoryId)

module.exports = app
