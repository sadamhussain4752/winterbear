// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const { uploadArray, multerErrorHandler } = require("../../Image/multerSetup")
const ProductController = require("../../controllers/AddProductController/ProductController");




// Create a new Product
router.post("/addProduct", uploadArray, multerErrorHandler, ProductController.createProduct);

// Get all categories
router.get("/allProduct", ProductController.getAllProducts);

// Get all showproduct
router.get("/ProductUserId", ProductController.getUserProducts);

// Get a specific Product by ID
router.get("/Product/:id", ProductController.getProductById);

// Updated a specific Product by ID
router.put("/Product/:id",uploadArray, multerErrorHandler, ProductController.updateProductById);

router.delete("/Product/:id", ProductController.deleteProductById);

module.exports = router;
