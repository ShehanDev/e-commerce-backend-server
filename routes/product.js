const express = require("express");
const router = express.Router();
const productApi = require("../controllers/product");
const multer = require("multer");

//multer middleware  to upload images
const storage = multer.diskStorage({
  //setting up upload path
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  //naming convention for  uploading  file
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("image");

//get all the product
router.get("/", productApi.fetchAllproducts);

//crete new product with image
router.post("/", upload, productApi.createProduct);

//get product id
router.get("/:id", productApi.fetchProductByid);

//update product
router.patch("/:id", upload, productApi.updateProductByid);

//delete product
router.delete("/:id", productApi.deleteProductByid);

//search
router.get("/search", productApi.searchProduct);

//sort
router.get("/sort", productApi.sortProduct);

module.exports = router;
