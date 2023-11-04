const Product = require("../models/product");
const fs = require("fs");

module.exports = class productApi {
  // Fetch all objects from db
  static async fetchAllproducts(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Product a data to the db
  static async createProduct(req, res) {
    const product = req.body;
    const imagename = req.file.filename;
    product.image = imagename;

    try {
      await Product.create(product);
      res.status(201).json({ message: "product created successfully " });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Get a data by id
  static async fetchProductByid(req, res) {
    const id = req.params.id;

    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Update data by id
  static async updateProductByid(req, res) {
    const id = req.params.id;
    let new_image = "";

    //getting the new image and assining to new image and delete old one
    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch (err) {
        console.log("New file error");
      }
    } else {
      //when the imgage not updated
      new_image = req.body.old_image;
    }

    const newProduct = req.body;
    newProduct.image = new_image;

    try {
      await Product.findByIdAndUpdate(id, newProduct);
      res.status(200).json({ message: "product updated successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
      console.log("Error");
    }
  }

  //delete a data from the db
  static async deleteProductByid(req, res) {
    const id = req.params.id;
    try {
      const result = await Product.findByIdAndDelete(id);

      //remove imege
      if (result.image != "") {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (err) {
          console.log(err);
        }
      }
      res.status(200).json({ message: "product deleted successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  // Search
  static async searchProduct(req, res) {
    try {
      const products = await Product.find(req.body);
      res.status(200).json(products);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Sort
  static async sortProduct(req, res) {
    try {
      const products = await Product.find().sort(req.body);
      res.status(200).json(products);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
