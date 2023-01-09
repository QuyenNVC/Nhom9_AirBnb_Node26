const { diskStorage } = require("multer");

const storage = (destination) => {
  return diskStorage({
    destination,
    filename: (req, file, cb) => {
      const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniquePrefix + "-" + file.originalname);
    },
  });
};

module.exports = (options) => {
  const { fieldName, maxFileSize, destination, validFunction } = options;
  return multer({
    limits: {
      fileSize: maxFileSize,
    },
    storage: storage(destination),
    fileFilter: function (_req, file, cb) {
      validFunction(file, cb);
    },
  }).single(fieldName);
};
