// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController/categoryController');

// Create a new category
router.post('/addcategories', categoryController.createCategory);

// Get all categories
router.get('/categories', categoryController.getAllCategories);

// Get a specific category by ID
router.get('/categories/:id', categoryController.getCategoryById);

// Updated a specific category by ID
router.put('/categories/:id', categoryController.updateCategoryById);

router.delete('/categories/:id', categoryController.deleteCategoryById);

module.exports = router;
