var multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    // Customize the file name based on your requirements
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize multer with the storage configuration for handling an array of files
const uploadArray = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          const err = new Error('Only .png, .jpg and .jpeg format allowed!')
          err.name = 'ExtensionError'
          return cb(err);
      }
  },
}).any('images') // 'images' is the field name, and 5 is the maximum number of files

// Custom error handler for multer
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading
    console.error('Multer error:', err);
    res.status(400).json({ success: false, error: 'Multer error', details: err.message });
  } else if (err) {
    // An unknown error occurred
    console.error('Unknown error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  } else {
    // No error occurred
    next();
  }
};

module.exports = { uploadArray, multerErrorHandler };
