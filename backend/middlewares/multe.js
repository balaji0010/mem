const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the destination folder exists
const destinationFolder = path.join(__dirname, "../videos"); 
if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationFolder); // Store videos in the F:/mem/backend/videos folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file to avoid duplicates
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /mp4|mov|avi|mkv/; // Allowed video formats
  const mimeType = allowedFileTypes.test(file.mimetype);
  const extName = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extName) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};

// Initialize multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // Increase to 100 MB
});


module.exports = upload;
