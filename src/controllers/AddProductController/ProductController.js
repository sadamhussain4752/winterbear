// controllers/Product.js
const Product = require("../../models/ProductModel/NewModelProduct");
const { BASEURL } = require('../../utils/Constants')
const { uploadHandlers } = require("../../Image/uploadHandlers")

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
    console.log(req.file, req.files);
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


  try {
    // Implement pagination and limit the number of records returned
    const pageNumber = parseInt(req.query.page) || 1; // Default page number is 1
    const pageSize = parseInt(req.query.limit) || 2000; // Default page size is 10

    const skip = (pageNumber - 1) * pageSize;

    const products = await Product.find({}) // Select only necessary fields
      .skip(skip)
      .limit(pageSize)
      .lean(); // Convert documents to plain JavaScript objects for better performance

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
exports.getProductByUpload = async (req, res) => {
  try {
    const Products = await Product.find();

    try {
    const filePath = "/home/root-mac/Documents/GitHub/winterbear-backend/Sheet1.json"; // Path to the JSON file

    // Read JSON data from the file
    const rawData = fs.readFileSync(filePath);
    const productsData = JSON.parse(rawData); // Parse JSON data

    // Map each object in the JSON array to a new object conforming to the ProductSchema
    const productsToAdd = [];

    for (const product of productsData) {
      const amount = parseFloat(product['MRP']);
      if (isNaN(amount)) {
        console.error(`Invalid MRP value for product: ${product['SKU Name']}`);
        continue; // Skip this product
      }

      try {
        console.log(product['Product']);
        // const fileUrls = await uploadHandlers(product['Product']); // Upload image for the product

        const newProduct = {
          name: product['Product Name '], // Map 'Product' to 'name'
          description: product['Basic Description '],
          amount: amount, // Use the parsed amount
          sku: product['SKU No '], // Map 'SKU Name' to 'sku'
          category: product['Category'], // Map 'Category' to 'category'
          offeramount: amount + 100, // Assuming default offer amount is 0
          color: "RED", // Example default color
          weight: "500g", // Example default weight
          dimensions: "10 x 10", // Example default dimensions
          availability: "IN STOCK", // Example default availability
          qty: "", // Assuming default quantity is empty
          createdBy: "", // Assuming no user is specified initially
          brand_id: "", // Assuming no brand is specified initially
          createdAt: new Date(), // Assuming current date as creation date
          lang: "INR", // Example language
          images: ["https://storage.googleapis.com/email-js-1a09b.appspot.com/winterbear/1715950793452-140559355"], // Set fileUrls as images array
          shipment: product['Shipment'],
          catalogueShoot: product['Sub-category'], // Correcting the misspelled key
          socialMedia: product['Brand'], // Correcting the space in the key
          websiteInfographics: product['Website Infograpics'], // Correcting the misspelled key
        };

        productsToAdd.push(newProduct);
      } catch (error) {
        console.error('File upload error:', error);
        return res.status(500).json({ success: false, error: "File upload error" });
      }
    }

    // const products = await Product.updateMany(
    //   {
    //     $or: [
    //       { images: { $exists: false } }, // lang key does not exist
    //       { images: null },               // lang key is null
    //       { images: "" }                  // lang key is an empty string
    //     ]
    //   },
    //   {
    //     $set: {
    //       images: ["https://storage.googleapis.com/email-js-1a09b.appspot.com/winterbear/1715950793452-140559355"], // Set fileUrls as images array

    //     },
    //   }
    // );


  //   async function removeDuplicateProducts(duplicates) {
  //     if (!duplicates.length) return; // No duplicates to remove
    
  //     const skusToDelete = duplicates.map(duplicate => duplicate.sku); // Extract SKUs for deletion
  //     await Product.deleteMany({ sku: { $in: skusToDelete } }); // Delete products with matching SKUs
  //   }
    
  //   // Example usage:
  //   (async () => {
  //     const duplicateList = await checkAllDuplicateSKUs();
    
  //     if (duplicateList.length > 0) {
  //       console.log("Duplicate SKUs found, removing them:");
  //       await removeDuplicateProducts(duplicateList);
  //       console.log("Duplicate products removed.");
  //     } else {
  //       console.log("No duplicate SKUs found.");
  //     }
  //   })();
  // //  let values = []
  //   async function checkAllDuplicateSKUs() {
  //     const pipeline = [
  //       { $group: { _id: "$sku", count: { $sum: 1 } } }, // Group by SKU and count documents
  //       { $match: { count: { $gt: 1 } } }, // Filter for groups with count > 1 (duplicates)
  //     ];
    
  //     const duplicates = await Product.aggregate(pipeline);
  //     return duplicates.map((duplicate) => ({
  //       sku: duplicate._id,
  //       count: duplicate.count,
  //     }));
  //   }
    
  //   // Example usage:
  //   (async () => {
  //     const duplicateList = await checkAllDuplicateSKUs();
    
  //     if (duplicateList.length > 0) {
  //       console.log("Duplicate SKUs found:");
  //       duplicateList.forEach((duplicate) => {
  //         values.push(`  SKU: ${duplicate.sku}, Count: ${duplicate.count}`)
  //         console.log(`  SKU: ${duplicate.sku}, Count: ${duplicate.count}`);
  //       });
  //     } else {
  //       console.log("No duplicate SKUs found across all products.");
  //     }
  //   })();
    
  //   // Example usage (similar to Option A)
    
  //   // Insert products into the database
  //   // const insertedProducts = await Product.insertMany(productsToAdd);

  //   return res.status(200).json({ success: true, values });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }

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
    if (name !== undefined && name !== null) existingProduct.name = name;
    if (description !== undefined && description !== null) existingProduct.description = description;
    if (amount !== undefined && amount !== null) existingProduct.amount = amount;
    if (offeramount !== undefined && offeramount !== null) existingProduct.offeramount = offeramount;
    // Handle image update if needed
    // existingProduct.images = req.fileUrls ;
  if (color !== undefined && color !== null) existingProduct.color = color;
    if (weight !== undefined && weight !== null) existingProduct.weight = weight;
    if (dimensions !== undefined && dimensions !== null) existingProduct.dimensions = dimensions;
    if (sku !== undefined && sku !== null) existingProduct.sku = sku;
    if (availability !== undefined && availability !== null) existingProduct.availability = availability;
    if (isActive !== undefined && isActive !== null) existingProduct.isActive = isActive;
    if (createdBy !== undefined && createdBy !== null) existingProduct.createdBy = createdBy;
    if (category !== undefined && category !== null) existingProduct.category = category;
    if (category_id !== undefined && category_id !== null) existingProduct.category_id = category_id;
    if (sub_brand_id !== undefined && sub_brand_id !== null) existingProduct.sub_brand_id = sub_brand_id;
    if (brand_id !== undefined && brand_id !== null) existingProduct.brand_id = brand_id;
    if (lang !== undefined && lang !== null) existingProduct.lang = lang;
    if (!isNaN(parseFloat(qty)) && isFinite(qty)) existingProduct.qty = qty; // Check if qty is a valid number
    if (key_word !== undefined && key_word !== null) existingProduct.key_word = key_word;

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
