// app.js
const express = require("express");
const ExcelJS = require('exceljs');
const functions = require("firebase-functions");
const path = require("path");
const fs = require("fs");
const axios = require('axios');
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
const cheerio   = require('cheerio');
const app = express();

const clientId = '1000.UJO1R63JR5AUE9NUK0V1GIJ6A7M7BR';
const clientSecret = '91b46a114cf1db78fa5918b170523d52ab4d9167f3';
const redirectUri = 'https://winter-bear-client.web.app/Allbrand';
const refreshToken = 'your_refresh_token';
let accessToken = 'your_access_token';
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

// // Function to refresh access token
// async function refreshAccessToken(clientId, clientSecret, redirectUri, refreshToken) {
//   const url = "https://accounts.zoho.com/oauth/v2/token";
//   const postData = new URLSearchParams({
//       'refresh_token': refreshToken,
//       'client_id': clientId,
//       'client_secret': clientSecret,
//       'redirect_uri': redirectUri,
//       'grant_type': 'refresh_token'
//   });

//   try {
//       const response = await axios.post(url, postData);
//       if (response.data.access_token) {
//           return response.data.access_token;
//       } else {
//           throw new Error(`Error refreshing access token: ${JSON.stringify(response.data)}`);
//       }
//   } catch (error) {
//       console.error(error);
//       process.exit(1);
//   }
// }

// // Function to create a lead
// async function createLead(accessToken, leadData) {
//   const url = "https://www.zohoapis.com/crm/v2/Leads";
//   const postData = { data: [leadData] };

//   try {
//       const response = await axios.post(url, postData, {
//           headers: {
//               'Authorization': `Zoho-oauthtoken ${accessToken}`,
//               'Content-Type': 'application/json'
//           }
//       });

//       if (response.status === 401) {
//           // Access token expired, refresh it
//           accessToken = await refreshAccessToken(clientId, clientSecret, redirectUri, refreshToken);
//           // Retry creating lead with new access token
//           return await createLead(accessToken, leadData);
//       }

//       return response.data;
//   } catch (error) {
//       console.error(error);
//       process.exit(1);
//   }
// }

// // Lead data
// const leadData = {
//   Company: 'Example Company',
//   Last_Name: 'Doe',
//   First_Name: 'John',
//   Email: 'john.doe@example.com',
//   Phone: '1234567890'
// };

// // Create lead
// createLead(accessToken, leadData).then(response => {
//   console.log(response);
// }).catch(error => {
//   console.error(error);
// });


// app.get('/upload-excel', async (req, res) => {
//   try {
//     const filePath = "/home/root-mac/Documents/GitHub/winterbear-backend/product-image.xlsx";

//     // Create a new workbook and read the file
//     const workbook = new ExcelJS.Workbook();
//     await workbook.xlsx.readFile(filePath);

//     // Get the first worksheet (you can change the index if needed)
//     const worksheet = workbook.getWorksheet(1);

    

//     // Define the headers you expect in the Excel file
//     const expectedHeaders = [
//       'Product Image',
//       'SKU No',
//       'Product Name',
//       'Category',
//       'Sub-category',
//       'Brand',
//       'Basic Description',
//       'MRP'
//     ];

//     // Convert worksheet rows to JSON
//     const jsonData = [];
//     worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
//       if (rowNumber === 1) {
//         // Assuming first row contains headers
//         const headers = row.values;
//         headers.shift(); // Remove the first empty element
//         if (headers.length !== expectedHeaders.length) {
//           throw new Error('Header length does not match expected headers');
//         }
//       } else {
//         let data = {};
//         row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
//           const header = expectedHeaders[colNumber - 1];
//           data[header] = cell.value;
//         });

//         // If the row contains an image, process it
//         const imageCell = row.getCell(1); // Assuming the image is in the first column
        
//         console.log(JSON.stringify(imageCell ,0,2) ,"imageCell112");

//         const imageId =  imageCell.value;

//         if (imageId && workbook.model.media) {
//           const media = workbook.model.media.find(item => item.index === imageId);

//           if (media) {
//             const imageBase64 = media.buffer.toString('base64');
//             data['Product Image'] = `data:image/${media.extension};base64,${imageBase64}`;
//           }
//         }

//         jsonData.push(data);
//       }
//     });

//     // console.log(jsonData);
//     // Send the JSON response
//     res.json(jsonData);
//   } catch (error) {
//     res.status(500).json({ error: 'Error processing file', details: error.message });
//   }
// });

// Endpoint for uploading and processing Excel file
app.get('/upload-excel', async (req, res) => {
  try {
    const filePath = "/home/root-mac/Documents/GitHub/winterbear-backend/product-image.xlsx";
    const uploadFolder = path.join(__dirname, 'uploaded_images'); // Folder where images will be uploaded

    // Ensure the upload folder exists, create if not
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }

    // Create a new workbook and read the file
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    // Get the first worksheet (you can change the index if needed)
    const worksheet = workbook.getWorksheet(1);

    // Define the headers you expect in the Excel file
    const expectedHeaders = [
      'Product Image',
      'SKU No',
      'Product Name',
      'Category',
      'Sub-category',
      'Brand',
      'Basic Description',
      'MRP'
    ];

    // Convert worksheet rows to JSON
    const jsonData = [];
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber === 1) {
        // Assuming first row contains headers
        const headers = row.values;
        headers.shift(); // Remove the first empty element
        if (headers.length !== expectedHeaders.length) {
          throw new Error('Header length does not match expected headers');
        }
      } else {
        let data = {};
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          const header = expectedHeaders[colNumber - 1];
          data[header] = cell.value;
        });

        // If the row contains an image, process it
        const imageCell = row.getCell(1); // Assuming the image is in the first column
        const imageId = imageCell.value;

        if (imageId && workbook.model.media) {
          const media = workbook.model.media.find(item => item.index === imageId);

          if (media) {
            const imageBuffer = Buffer.from(media.buffer, 'base64');
            const imagePath = path.join(uploadFolder, `${data['Product Name']}_${imageId}.${media.extension}`);
            
            // Write image to file
            // fs.writeFileSync(imagePath, imageBuffer);
            console.log(imagePath, imageBuffer);
            
            // Update data with image path
            data['Product Image'] = imagePath;
          }
        }

        jsonData.push(data);
      }
    });

    // Send the JSON response
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Error processing file', details: error.message });
  }
});


// exports.emailjs = functions.https.onRequest(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
                                                                                  


// const fs = require('fs');
// const cheerio   = require('cheerio');

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



// const express = require('express');
// const ExcelJS = require('exceljs');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 5000;

// // Endpoint to read an Excel file and convert it to JSON
// app.get('/upload-excel', async (req, res) => {
//   try {
//     const filePath = "/home/root-mac/Documents/GitHub/winterbear-backend/Image.xlsx";

//     // Create a new workbook and read the file
//     const workbook = new ExcelJS.Workbook();
//     await workbook.xlsx.readFile(filePath);

//     // Get the first worksheet (you can change the index if needed)
//     const worksheet = workbook.getWorksheet(2);

//     // Define the headers you expect in the Excel file
//     const expectedHeaders = [
//       'Product Image',
//       'SKU No',
//       'Product Name',
//       'Category',
//       'Sub-category',
//       'Brand',
//       'Basic Description',
//       'MRP'
//     ];

//     // Convert worksheet rows to JSON
//     const jsonData = [];
//     worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
//       if (rowNumber === 1) {
//         // Assuming first row contains headers
//         const headers = row.values;
//         headers.shift(); // Remove the first empty element
//         if (headers.length !== expectedHeaders.length) {
//           throw new Error('Header length does not match expected headers');
//         }
//       } else {
//         let data = {};
//         row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
//           const header = expectedHeaders[colNumber - 1];
//           data[header] = cell.value;
//         });

//         // If the row contains an image, process it
//         const imageCell = row.getCell(1); // Assuming the image is in the first column
//         const imageId = imageCell.value;

//         if (imageId && workbook.model.media) {
//           const media = workbook.model.media.find(item => item.index === imageId);

//           if (media) {
//             const imageBase64 = media.buffer.toString('base64');
//             data['Product Image'] = `data:image/${media.extension};base64,${imageBase64}`;
//           }
//         }

//         jsonData.push(data);
//       }
//     });

//     console.log(jsonData);
//     // Send the JSON response
//     res.json(jsonData);
//   } catch (error) {
//     res.status(500).json({ error: 'Error processing file', details: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



