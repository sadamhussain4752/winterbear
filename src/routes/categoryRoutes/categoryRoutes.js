// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { uploadArray, multerErrorHandler } = require("../../Image/multerSetup")

const categoryController = require('../../controllers/categoryController/categoryController');

// Create a new category
router.post('/addcategories',uploadArray, multerErrorHandler, categoryController.createCategory);

// Get all categories
router.get('/categories', categoryController.getAllCategories);

// Get a specific category by ID
router.get('/categories/:id', categoryController.getCategoryById);

// Updated a specific category by ID
router.put('/categories/:id',uploadArray, multerErrorHandler, categoryController.updateCategoryById);

router.delete('/categories/:id', categoryController.deleteCategoryById);

module.exports = router;
