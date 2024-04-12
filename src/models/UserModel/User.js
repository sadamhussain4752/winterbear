// models/User.js
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  UserType: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String },
  lang: { type: String, unique: false },
  profile_img: {type: String},
  loyalty_point : {type: String, default :"0"},
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Add a method to generate a verification token
userSchema.methods.generateVerificationToken = function () {
  const user = this;
  const verificationToken = jwt.sign(
    { ID: user._id },
    process.env.USER_VERIFICATION_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return verificationToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
