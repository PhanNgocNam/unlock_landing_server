const express = require("express");
const authRouter = require("./auth.route.js");
const pageElementRouter = require("./pageElement.route.js");
const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/pageElement", pageElementRouter);
module.exports = {
  rootRouter,
};
