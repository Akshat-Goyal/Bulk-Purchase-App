const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  // mongoose.connection.db.dropDatabase();
  console.log("MongoDB database connection established succesfully.");
});

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const reviewRoutes = require("./routes/review");
const vendorRoutes = require("./routes/vendor");

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/customer", customerRoutes);
app.use("/review", reviewRoutes);
app.use("/vendor", vendorRoutes);

app.listen(PORT, function() {
  console.log("Server is running on port: " + PORT);
});
