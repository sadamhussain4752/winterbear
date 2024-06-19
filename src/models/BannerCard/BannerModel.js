// models/Brand.js
const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: String,
  banner_img_mob: String,
  link_brand: String,
  isActive: { type: Boolean, default: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lang: { type: String, required: true },

});

const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;
