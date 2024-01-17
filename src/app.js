// app.js
const express = require("express");
const path = require('path')
const fs = require('fs');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const UserController = require("./routes/UserRoutes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes/categoryRoutes");
const brandRoutes = require("./routes/BrandRoutes/brandRoutes");
const productRoutes = require("./routes/ProductRoutes/productRoutes");
const couponRoutes = require("./routes/couponRoutes/CouponRouter");
const addressRoutes = require("./routes/AddressRoutes/addressRoutes");
const addcartRoutes = require("./routes/AddCartRoutes/addCartRoutes");
const orderRoutes = require("./routes/OrderRoutes/orderRoutes");
const BannerRoutes = require("./routes/BannerRouters/BannerRoutes");


const app = express();

// Use express.static to serve static files (including images)
app.use(
  '/image',
   express.static(path.join(__dirname, './../uploads'))
 );

const port = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://sadamdon1234:1YktFZRZ1cX0PRj4@cluster0.nhacelr.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Additional setup, if any

app.use(bodyParser.json());

// Use routes

app.use("/api/auth", authRoutes);
app.use("/api/user", UserController);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/product", productRoutes);
app.use("/api/coupon", couponRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/addcart', addcartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/header', BannerRoutes);





// Additional routes or middleware, if any

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
