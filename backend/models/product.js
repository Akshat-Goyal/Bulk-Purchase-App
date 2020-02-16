const mongoose = require("mongoose");

let Product = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Product", Product);
