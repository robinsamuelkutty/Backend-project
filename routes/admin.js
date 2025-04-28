var express = require("express");
var productHelper = require("../helpers/product-helpers");
var router = express.Router();
const { getAllProducts } = require("../helpers/product-helpers.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  productHelper.getAllProducts().then((products) => {
    console.log(products);
    res.render("admin/view-products", { admin: true, products });
  });
});

router.get("/add-products", (req, res) => {
  res.render("admin/add-products");
});
router.post("/add-products", function (req, res) {
  productHelper.addProduct(req.body, (id) => {
    res.render("admin/add-products");
    let image = req.files.image;
    image.mv("./public/product-images/" + id + ".jpg", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("done");
      }
    });
  });
});
module.exports = router;



