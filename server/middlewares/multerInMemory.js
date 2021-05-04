const multer = require('multer');

// Set Storage
const storage = multer.memoryStorage();

// Set upload function
exports.upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});
