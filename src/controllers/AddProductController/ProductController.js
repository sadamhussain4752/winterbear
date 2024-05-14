// controllers/Product.js
const Product = require("../../models/ProductModel/NewModelProduct");
const {BASEURL} = require('../../utils/Constants')
const {uploadHandlers} = require("../../Image/uploadHandlers")

const ExcelJS = require('exceljs');
const fs = require('fs');
// Create a new Product

const LANGID = {
  1: "IND",
  2: "JPN",
  3: "KOR",
  4: "AUS",
};

exports.createProduct = async (req, res) => {

  try {
      const {
        name,
        description,
        amount,
        offeramount,
        color,
        weight,
        dimensions,
        sku,
        availability,
        isActive,
        createdBy,
        category,
        category_id,
        brand_id,
        lang,
        qty,
        sub_brand_id
      } = req.body;
      console.log(req.file,req.files);
      // Assuming "images" is a file field in the form
      const imagePaths = req.files ? req.files.map(file => `${file.filename}`) : null;
       console.log(req.fileUrls);
      const newProduct = await Product.create({
          name,
          description,
          amount,
          offeramount,
          images: req.fileUrls[0], // Storing images as base64-encoded string, adjust as needed
          color,
          weight,
          dimensions,
          sku,
          availability,
          isActive,
          createdBy,
          category,
          brand_id,
          category_id,
          lang,
          qty,
          sub_brand_id
      });

  console.log(products);
      res.status(200).json({ success: true, product: newProduct });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
  }
}

exports.getAllProducts = async (req, res) => {
  const { lang } = req.query;

  // Validate 'lang' parameter
  if (!lang || !LANGID[lang]) {
    return res.status(400).json({ success: false, error: "Invalid 'lang' parameter" });
  }
  
  const products = await Product.updateMany(
    {}, // Empty filter to match all documents
    {
      $set: {
        key_word:"",
      },
    }
  );

  console.log(products);

  

  try {
    const products   = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }

  // try {
  //   const filePath = "/home/root-mac/Documents/GitHub/winterbear-backend/Sheet1.json"; // Path to the JSON file

  //   // Read JSON data from the file
  //   const rawData = fs.readFileSync(filePath);
  //   const productsData = JSON.parse(rawData); // Parse JSON data

  //   // Map each object in the JSON array to a new object conforming to the ProductSchema
  //   const productsToAdd = [];

  //   for (const product of productsData) {
  //     const amount = parseFloat(product['MRP'].replace('₹', ''));
  //     if (isNaN(amount)) {
  //       console.error(`Invalid MRP value for product: ${product['SKU Name']}`);
  //       continue; // Skip this product
  //     }

  //     try {
  //       const fileUrls = await uploadHandlers(product['Product']); // Upload image for the product

  //       const newProduct = {
  //         name: product['Category'], // Map 'Product' to 'name'
  //         description: product['SKU Name'],
  //         amount: amount, // Use the parsed amount
  //         sku: product['SKU Name'], // Map 'SKU Name' to 'sku'
  //         category: product['Category'], // Map 'Category' to 'category'
  //         offeramount: 0, // Assuming default offer amount is 0
  //         color: "RED", // Example default color
  //         weight: "500g", // Example default weight
  //         dimensions: "10 x 10", // Example default dimensions
  //         availability: "IN STOCK", // Example default availability
  //         qty: "", // Assuming default quantity is empty
  //         createdBy: "", // Assuming no user is specified initially
  //         brand_id: "", // Assuming no brand is specified initially
  //         createdAt: new Date(), // Assuming current date as creation date
  //         lang: "INR", // Example language
  //         images: fileUrls, // Set fileUrls as images array
  //         shipment: product['Shipment'],
  //         catalogueShoot: product['Catalouge Shoot'], // Correcting the misspelled key
  //         socialMedia: product['Social Media'], // Correcting the space in the key
  //         websiteInfographics: product['Website Infograpics'], // Correcting the misspelled key
  //       };

  //       productsToAdd.push(newProduct);
  //     } catch (error) {
  //       console.error('File upload error:', error);
  //       return res.status(500).json({ success: false, error: "File upload error" });
  //     }
  //   }

  //   // Insert products into the database
  //   const insertedProducts = await Product.insertMany(productsToAdd);

  //   return res.status(200).json({ success: true, insertedProducts });

  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ success: false, error: "Server error" });
  // }
};




// Get user-specific Products by language and search criteria
exports.getUserProducts = async (req, res) => {
  try {
    const { lang, search } = req.query;
    if (!LANGID[lang]) {
      return res.status(400).json({ success: false, error: "Invalid language code" });
    }

    

    const query = {
      lang: LANGID[lang],
      isActive: true,  // Include only active products
      $or: [
        { name: { $regex: new RegExp(search, 'i') } },  // Case-insensitive search for name
        { description: { $regex: new RegExp(search, 'i') } },  // Case-insensitive search for description
      ],
    };

    const userProducts = await Product.find(query);

    res.status(200).json({ success: true, userProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


// Get a specific Product by ID
exports.getProductById = async (req, res) => {
  try {
    const ProductId = req.params.id;
    const Products = await Product.findById(ProductId);

    if (!Products) {
      return res
        .status(404)
        .json({ success: false, message: "Products not found" });
    }

    res.status(200).json({ success: true, Products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update a specific Product by ID
exports.updateProductById = async (req, res) => {
    try {
      const ProductId = req.params.id;
      const {
        name,
        description,
        amount,
        offeramount,
        color,
        weight,
        dimensions,
        sku,
        availability,
        isActive,
        createdBy,
        category,
        lang,
        brand_id,
        qty,
        category_id,
        sub_brand_id,
        key_word

      } = req.body;
  
      // Check if the Product exists
      const existingProduct = await Product.findById(ProductId);
  
      if (!existingProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      const imagePaths = req.files ? req.files.map(file => `${file.filename}`) : null;

      // Update the Product fields
      existingProduct.name = name;
      existingProduct.description = description;
      existingProduct.amount = amount;
      existingProduct.offeramount = offeramount;
      existingProduct.images = req.fileUrls ;
      existingProduct.color = color;
      existingProduct.weight = weight;
      existingProduct.dimensions = dimensions;
      existingProduct.sku = sku;
      existingProduct.availability = availability;
      existingProduct.isActive = isActive;
      existingProduct.createdBy = createdBy;
      existingProduct.category = category;
      existingProduct.category_id = category_id;
      existingProduct.sub_brand_id = sub_brand_id;
      existingProduct.brand_id = brand_id;
      existingProduct.lang = lang;
      existingProduct.qty = qty;
      existingProduct.key_word = key_word;
  
      // Save the updated Product
      const updatedProduct = await existingProduct.save();
  
      res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };
  

// Delete a specific Product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const ProductId = req.params.id;

    // Check if the Product exists
    const existingProduct = await Product.findById(ProductId);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Remove the Product from the database
    await Product.deleteOne({ _id: ProductId });

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
