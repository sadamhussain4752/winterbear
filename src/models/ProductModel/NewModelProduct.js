const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, },
  description: { type: String,  },
  amount: { type: Number,  },
  offeramount: { type: Number,  },
  images: [String], // Array to store multiple image URLs
  color: String,
  weight: String,
  dimensions: String,
  sku: String,
  availability: String,
  qty: { type: Number },
  isActive: { type: Boolean, default: true },
  createdBy: { type: String,}, // Assuming you have a User model
  category: { type: String, }, // Assuming you have a Category model
  brand_id: { type: String, }, // Assuming you have a Category model
  createdAt: { type: Date, default: Date.now },
  lang: { type: String },
  shipment:{ type: String },
  catalogueShoot:{ type: String },
  socialMedia:{ type: String },
  websiteInfographics: {type: String}
});


const Product = mongoose.model('Newproduct', ProductSchema);

module.exports = Product;
