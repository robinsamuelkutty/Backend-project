var db= require("../config/connection")
var collections = require('../config/collection');
module.exports ={
    
  addProduct: (product, callback) => {
    product.price = parseInt(product.price)
    db.get().collection(collections.PRODUCT_COLLECTION).insertOne(product).then((data) => {
        var objectId = product._id
        callback(objectId)

    })

  },
 getAllProducts: function () {
  return new Promise(async (resolve, reject) => {
      let products = await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray()
      resolve(products)
  })
 },
}