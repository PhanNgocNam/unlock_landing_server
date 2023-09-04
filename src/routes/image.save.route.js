const express = require("express");
const { saveController } = require("../controller/image.save.controler");
const { authenticateToken } = require("../middlewares/authenticateToken");
const { checkPermission } = require("../middlewares/checkPermission");
const { resizeImage } = require("../middlewares/resizeImage");
const { upload } = require("../utils/multer");
const router = express.Router();

router.post(
  "/save",
  authenticateToken,
  checkPermission([-1, 9]),
  upload.single("file"),
  resizeImage,
  saveController
);

module.exports.saveRouter = router;
