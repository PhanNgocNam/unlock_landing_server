const express = require("express");
const pagesRouter = express.Router();

const { upload } = require("../utils/multer");

const {
  getAllPageElement,
  updateTextElement,
  updateImageElementController,
} = require("../controller/pageElementController");
const { authenticateToken } = require("../middlewares/authenticateToken");
const { checkPermission } = require("../middlewares/checkPermission");
const { resizeImage } = require("../middlewares/resizeImage");

pagesRouter.get("/getAllPageElement", getAllPageElement);

pagesRouter.put(
  "/updateTextElement",
  authenticateToken,
  checkPermission([-1]),
  updateTextElement
);

pagesRouter.put(
  "/updateImageElement",
  authenticateToken,
  checkPermission([-1]),
  upload.single("file"),
  resizeImage,
  updateImageElementController
);

module.exports = pagesRouter;
