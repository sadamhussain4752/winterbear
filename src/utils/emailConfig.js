// utils/emailConfig.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "52e457dc9e0503",
      pass: "8858da8e33ed5d"
    }
});

module.exports = transporter;
