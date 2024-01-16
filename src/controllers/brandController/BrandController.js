// controllers/Brand.js
const Brand = require("../../models/Brand/BrandModel");

// Create a new brand
exports.createBrand = async (req, res) => {
  try {
    const { name, description, imageUrl, isActive, createdBy, lang,category_id } = req.body;

    const newBrand = await Brand.create({
      name,
      description,
      imageUrl,
      isActive,
      createdBy,
      category_id,
      lang,
    });

    res.status(201).json({ success: true, brand: newBrand });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    res.status(200).json({ success: true, brands });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get a specific brand by ID
exports.getBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    res.status(200).json({ success: true, brand });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update a specific brand by ID
exports.updateBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;
    const { name, description, imageUrl, createdBy, lang } = req.body;

    // Check if the brand exists
    const existingBrand = await Brand.findById(brandId);

    if (!existingBrand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    // Update the brand fields
    existingBrand.name = name;
    existingBrand.description = description;
    existingBrand.imageUrl = imageUrl;
    existingBrand.createdBy = createdBy;
    existingBrand.lang = lang;

    // Save the updated brand
    const updatedBrand = await existingBrand.save();

    res.status(200).json({ success: true, brand: updatedBrand });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete a specific brand by ID
exports.deleteBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;

    // Check if the brand exists
    const existingBrand = await Brand.findById(brandId);

    if (!existingBrand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    // Remove the brand from the database
    await Brand.deleteOne({ _id: brandId });

    res.status(200).json({ success: true, message: "Brand deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
