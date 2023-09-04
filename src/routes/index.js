const express = require("express");
const pageElementRouter = require("./pageElement.route.js");
const { saveRouter } = require("./image.save.route.js");
const rootRouter = express.Router();

rootRouter.use("/pageElement", pageElementRouter);
rootRouter.use("/image", saveRouter);
module.exports = {
  rootRouter,
};
