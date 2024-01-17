// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { uploadArray, multerErrorHandler } = require("../../Image/multerSetup")
const BrandController = require('../../controllers/brandController/BrandController');

// Create a new Brand
router.post('/addbrand', uploadArray, multerErrorHandler, BrandController.createBrand);

// Get all categories
router.get('/allbrand', BrandController.getAllBrands);

// Get a specific Brand by ID
router.get('/brand/:id', BrandController.getBrandById);

// Updated a specific Brand by ID
router.put('/brand/:id', BrandController.updateBrandById);

router.delete('/brand/:id', BrandController.deleteBrandById);

module.exports = router;
