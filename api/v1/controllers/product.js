const Product = require('./../../../models/product')
const __ = require('../../../helpers/response')

function validateProduct(data) {
let error;
switch(true) {
  case (!data.name): 
    error = new Error("Product name cannot be empty")
    break
  case (!data.code): 
    error = new Error("Product code cannot be empty")
    break
  case (!data.price): 
    error = new Error("Product price cannot be empty")
    break
  case (!data.description): 
    error = new Error("Product description cannot be empty")
    break
  case (!data.logo): 
    error = new Error("Product img url cannot be empty")
    break
  case (!data.measuringUnit): 
    error = new Error("Product measuring unit cannot be empty")
    break
  case (!data.ingredient): 
    error = new Error("Product ingredient cannot be empty")
    break
  case (!data.nutrient): 
    error = new Error("Product nutrient cannot be empty")
    break
  case (!data.category): 
    error = new Error("Product category cannot be empty")
    break
  }
  if(error) {
    error.status = 400
    throw error
  }
  return
}

class ProductController {
  async createProduct(req, res) {
    try {
      const { body } = req
      validateProduct(body)
      let product = Product(body)
      product = await product.save()
      return __.success(res, product, '')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async getAllProduct(req, res) {
    try {
      const products = await Product.find({
        isDeleted: false
      })
      return __.success(res, products, '')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async getProductById(req, res) {
    try {
      const { params: { productId } } = req
      if(!productId) {
        return __.send(res, 400, `Please enter a product id`)
      }
      const product = await Product.findOne({
        _id: productId,
        isDeleted: false
      })
      if(!product) {
        return __.notFound(res, `Product ${productId} not found`)
      }
      return __.success(res, product, '')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async getProductByCategoryId(req, res) {
    try {
      const { params: { categoryId } } = req
      if(!categoryId) {
        return __.send(res, 400, `Please enter a product category ID`)
      }
      const product = await Product.findOne({
        category: categoryId,
        isDeleted: false
      })
      if(!product) {
        return __.notFound(res, `Product ${name} not found`)
      }
      return __.success(res, products, '')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async deleteProductById(req, res) {
    try {
      const { params: { productId } } = req
      if(!productId) {
        return __.send(res, 400, `Please enter a product ID`)
      }
      let condition = {
        _id: params.productId,
        isDeleted: false,
      }
      let update = {
        isDeleted: true,
        deletedOn: new Date(),
        deletedBy: req.user
      }
      const product = await Product.findOneAndUpdate(condition, update)
      if(!product) {
        return __.notFound(res, `Product ${productId} not found`)
      }
      return __.success(res, products, 'Product deleted successfully')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async updateProductById(req, res) {
    try {
      const { body, params: { productId } } = req
      if(!productId) {
        return __.send(res, 400, `Please enter a product ID`)
      }
      let condition = {
        _id: params.productId,
        isDeleted: false,
      }
      let update = body
      const product = await Product.findOneAndUpdate(condition, update)
      if(!product) {
        return __.notFound(res, `Product ${productId} not found`)
      }
      return __.success(res, products, 'Product deleted successfully')
    } catch (error) {
      return __.error(res, error)
    }

  }
}

const obj = new ProductController()
module.exports = obj