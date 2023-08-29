const express = require("express");
const pagesRouter = express.Router();
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/assets/images/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const {
  getAllPageElement,
  updateTextElement,
  updateImageElement,
} = require("../controller/pageElementController");
const {
  authenticateToken,
  isAdmin,
} = require("../middlewares/authenticateToken");

pagesRouter.get("/getAllPageElement", getAllPageElement);

pagesRouter.put(
  "/updateTextElement",
  authenticateToken,
  isAdmin([-1]),
  updateTextElement
);

pagesRouter.put(
  "/updateImageElement",
  upload.single("file"),
  authenticateToken,
  isAdmin([-1]),
  updateImageElement
);

module.exports = pagesRouter;
