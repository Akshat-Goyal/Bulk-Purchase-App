const router = require("express").Router();
let Product = require("./../models/product");

// Adding a new product of the vendor
router.route("/add").post(function(req, res) {
  let product = new Product(req.body);
  product
    .save()
    .then(product => {
      res.status(200).json({ Product: "Product added successfully" });
    })
    .catch(err => {
      res.status(400).send("Error: " + err);
    });
});

// view all the products of the vendor
router.route("/view").post(function(req, res) {
  username = req.body.username;
  Product.find({ username: username })
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete").post(function(req, res) {
  Product.deleteOne({ _id: req.body.id })
    .exec()
    .then(product =>
      res.status(200).json({ Product: "Product deleted successfully!" })
    )
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
