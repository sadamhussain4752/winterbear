// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { uploadArray, multerErrorHandler } = require("../../Image/multerSetup");
const BannerController = require('../../controllers/AddBannerController/addBannerController');  // Corrected import

// Create a new banner
router.post('/addbanner', uploadArray, multerErrorHandler, BannerController.createBannerItem);

// Get all categories
router.get('/allbanner', BannerController.getAllBanners);

// Get only banner list
router.get('/getbannerlist', BannerController.getBannerslist);

//Get all Lang product
router.get('/allbrandproduct', BannerController.getAllBannerbyproduct);

// Get a specific Brand by ID
router.get('/banner/:id', BannerController.getBannerById);

// Updated a specific Brand by ID
router.put('/banner/:id', uploadArray, multerErrorHandler,  BannerController.updateBannerItem);

router.delete('/banner/:id', BannerController.deleteBannerItem);

module.exports = router;
