// const { diskStorage } = require("multer");

// const storage = (destination) => {
//   return diskStorage({
//     destination,
//     filename: (req, file, cb) => {
//       const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniquePrefix + "-" + file.originalname);
//     },
//   });
// };

// module.exports = (options) => {
//   const { fieldName, maxFileSize, destination, validFunction } = options;
//   return multer({
//     limits: {
//       fileSize: maxFileSize,
//     },
//     storage: storage(destination),
//     fileFilter: function (_req, file, cb) {
//       validFunction(file, cb);
//     },
//   }).single(fieldName);
// };

// uploader cloudinary

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
// const result = require("dotenv").config({ path: "../../../.env" });
// console.log(result.error);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  //   filename: function (req, file, cb) {
  //     cb(null, file.originalname);
  //   }
  params: {
    // lưu ảnh trong folder
    folder: "node-airbnb",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
