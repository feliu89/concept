const multer = require('multer');

// Set Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads'); // The folder is not created
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

// Set upload function
exports.upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});
