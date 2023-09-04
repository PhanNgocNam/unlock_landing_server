const multer = require("multer");
const { customeCheckFileType } = require("../middlewares/checkFileType");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/assets/images/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + `-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fieldSize: 2000000 },
  fileFilter: (req, file, cb) => {
    customeCheckFileType(file, cb);
  },
});

module.exports.upload = upload;
