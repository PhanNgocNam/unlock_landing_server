const express = require("express");
const pageElementRouter = require("./pageElement.route.js");
const rootRouter = express.Router();

rootRouter.use("/pageElement", pageElementRouter);
module.exports = {
  rootRouter,
};
