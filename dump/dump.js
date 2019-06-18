'use strict'

const CategoryModel = require('./../models/category')
const ProductModel = require('./../models/product')
const exceltojson = require("xlsx-to-json-lc")
const db = require('../helpers/db')
db.connectMongo()

const insertCategory = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            console.log('inserting native custom parameters')
            await CategoryModel.deleteMany({})
            let status = await CategoryModel.insertMany(data)
            console.log('Process ended')
            resolve()
            // process.exit(1)
        } catch (error) {
            console.error('Error occured')
            console.error(error)
            reject(error)
        }
    })
}

const insertProducts =  (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            console.log('inserting native custom parameters')
            await ProductModel.deleteMany({})
            const length = data.length
            for (let index = 0; index < length; index++) {
                const item = data[index]
                let category = await CategoryModel.findOne({ name: item.category })
                item.category = category._id
            }
            let status = await ProductModel.insertMany(data)
            console.log('Process ended')
            resolve()
            process.exit(1)
        } catch (error) {
            console.error('Error occured')
            console.error(error)
            reject(error)
        }
    })
}
setTimeout(() => {

    exceltojson({
        input: 'dump/pressatoProductDatabase.xlsx',
        sheet: "Sheet1",  // specific sheetname inside excel file (if you have multiple sheets)
        output: null,
        lowerCaseHeaders: true //to convert all excel headers to lowr case in json
    }, async function (err, result) {
        if (err) {
            console.error(err);
        } else {
            const length = result.length
            const categoryData = []
            let catergoryUniqueData = []
            const productData = []
            for (let index = 0; index < length; index++) {
                const item = result[index]
                if (item.categoryname && catergoryUniqueData.indexOf(item.categoryname) == -1) {
                    catergoryUniqueData.push(item.categoryname)
                    categoryData.push({
                        "isDeleted": false,
                        "name": item.categoryname,
                        "description": item.categorydescription,
                        "shortDescription": item.shortdescription,
                        "logo": item.categorylogo,                        
                    })
                }
                if(item.sno){
                    productData.push({
                        'category': item.categoryname.toLowerCase(),
                        "logo": item.logo,
                        "detailedLogo": item.logo,
                        "name": item.productname,
                        "actualPrice": item.actualprice,
                        "discountPrice": item.discountprice,
                        "volume": item.volume,
                        "measuringUnit": item.measuringunit,
                        "ingredient": item.ingredient,
                        "goodness": item.goodness,
                        "intention": item.intention,
                        "nutrient": item.nutrient,
                    })
                }
            }
            await insertCategory(categoryData)
            await insertProducts(productData)
        }
    });
    // process.exit()
    // })


}, 100) 