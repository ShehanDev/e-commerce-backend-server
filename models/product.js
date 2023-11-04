const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  sku: String,
  name: String,
  desc: String,
  image: String,
  quantity: Number,
  price: Number,

  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
