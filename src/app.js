// app.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors"); // Import cors middleware
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const UserController = require("./routes/UserRoutes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes/categoryRoutes");
const brandRoutes = require("./routes/BrandRoutes/brandRoutes");
const SubBrandRoutes = require("./routes/SubBrandRoutes/subBrandRoutes")
const productRoutes = require("./routes/ProductRoutes/productRoutes");
const couponRoutes = require("./routes/couponRoutes/CouponRouter");
const addressRoutes = require("./routes/AddressRoutes/addressRoutes");
const addcartRoutes = require("./routes/AddCartRoutes/addCartRoutes");
const orderRoutes = require("./routes/OrderRoutes/orderRoutes");
const BannerRoutes = require("./routes/BannerRouters/BannerRoutes");
const EmployeeRoutes = require("./routes/AddEmployess/addEmployeesRoutes")
const FAQRoutes = require("./routes/AddFaqRoutes/faqRoutes")
const RatingRoute = require("./routes/AddRatingRoutes/RatingRoutes")
const EventRoute = require("./routes/AddEventRoutes/EventRoutes")
const BlogRoutes = require("./routes/AddBlogsRoutes/BlogRoutes")
const WishlistRoutes = require("./routes/addwishlistRouters/WishlistRoutes")
// const files = fs.readFileSync('./62ACF8182B9E5DCCC1E610CE4B2C525F.txt') 

const app = express();
// Use cors middleware
app.use(cors());


// Use express.static to serve static files (including images)
app.use(express.static(path.join(__dirname, "./../uploads")));

const port = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://sadamdon1234:1YktFZRZ1cX0PRj4@cluster0.nhacelr.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Additional setup, if any

app.use(bodyParser.json());

// Use routes

app.use("/api/auth", authRoutes);
app.use("/api/user", UserController);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/sub-brand", SubBrandRoutes);
app.use("/api/product", productRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/addcart", addcartRoutes);
app.use("/api/wishlist", WishlistRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/header", BannerRoutes);
app.use("/api/staff", EmployeeRoutes);
app.use("/api/faq", FAQRoutes);
app.use("/api/review",RatingRoute);
app.use("/api/event",EventRoute);
app.use("/api/blog",BlogRoutes);


// Additional routes or middleware, if any



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// // const express = require('express');
// // const nodemailer = require('nodemailer');
// // const bodyParser = require('body-parser');
// // const cors = require("cors"); // Import cors middleware


// // const app = express();
// // const port = 3000;
// // app.use(cors());


// // app.use(bodyParser.json()); // Use bodyParser.json() instead of bodyParser.urlencoded()
// // app.use(express.static('public')); // Serve static files from 'public' directory

// // // Email configuration
// // const transporter = nodemailer.createTransport({
// //     host: "smtp.gmail.com",
// //     port: 587,
// //     auth: {
// //         user: "noreply@imsolutions.mobi",
// //         pass: "ssfnuabpmshuhlwj"
// //     }
// // });

// // // Function to validate email
// // function validateEmail(value) {
// //     const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
// //     return value === '' ? false : !regex.test(value);
// // }

// // // Function to validate mobile number
// // function validateMobile(phone) {
// //     return "";
// // }

// // app.post('/submit-form', (req, res) => {
// //     const { name, email, phone, message } = req.body;
// //     const subject = 'Enquiry from Bengal Lamps Bangalore';

// //     // // Validation logic
// //     // if (!name || !email || !phone || !message) {
// //     //     return res.status(400).send('All fields are required');
// //     // }

// //     // if (!validateMobile(phone)) {
// //     //     return res.status(400).send('Enter a valid 10-digit mobile number');
// //     // }

// //     // if (!validateEmail(email)) {
// //     //     return res.status(400).send('Enter a valid email address');
// //     // }

// //     const emailContent = `
// //     <p>Name: ${name}</p>
// //     <p>Email: ${email}</p>
// //     <p>Phone: ${phone}</p>
// //     <p>Message: ${message}</p>
// //     <table cellspacing="0" cellpadding="0" style="width:100%; border-bottom:1px solid #eee; font-size:12px; line-height:135%">
// //         <!-- ... (same as PHP code) ... -->
// //     </table>
// // `;

// //     // Email options
// //     const mailOptions = {
// //         from: 'Bengal Lamps Bangalore <noreply@ims.a2hosted.com>',
// //         to: ['sadamdon4752@gmail.com'],
// //         subject: subject,
// //         html: emailContent
// //     };

// //     // Send email
// //     transporter.sendMail(mailOptions, (error, info) => {
// //         if (error) {
// //             console.error(error);
// //             res.status(500).send('Internal Server Error');
// //         } else {
// //             console.log('Email sent: ' + info.response);
// //             res.status(200).send('Email sent successfully');
// //         }
// //     });
// // });

// // app.listen(port, () => {
// //     console.log(`Server is running at http://localhost:${port}`);
// // });

// const fs = require('fs');
// const cheerio = require('cheerio');

// // Read HTML content from a file
// const htmlContent = fs.readFileSync("/home/root-mac/Documents/GitHub/winterbear-backend/Sheet1.html", 'utf8');

// function extractTableData(html) {
//   const $ = cheerio.load(html);
//   const tableData = [];

//   // Get headers (assuming they are in the first row)
//   const headers = [];
//   $('table tr:first-child th').each((i, th) => {
//       headers.push($(th).text().trim());
//   });

//   // Loop through each row (excluding header row)
//   $('table tr:not(:first-child)').each((i, row) => {
//       c   onst rowData = {};
//       $(row).find('td').each((j, cell) => {
//           const key = headers[j]; // Use header as key
//           let value = $(cell).text().trim(); // Get text content of cell as value
//           // Check if the cell contains an <img> tag
//           const imgSrc = $(cell).find('img').attr('src');
//           if (imgSrc) {
//               value = imgSrc; // If found, set the value to the src attribute of the <img> tag
//           }
//           rowData[key] = value;
//       });
//       tableData.push(rowData);
//   });

//   return tableData;
// }




// // Call the function and log the results
// const imageSources = extractTableData(htmlContent);

// // Store image sources in a JSON file
// const jsonContent = JSON.stringify(imageSources, null, 2); // Convert array to JSON string with indentation
// fs.writeFileSync('Sheet1.json', jsonContent);

// console.log('Image sources saved to backup_image.json');
