require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { sequelize } = require("./src/models");
const { rootRouter } = require("./src/routes");
app.use(express.static(path.join(__dirname, "./public")));
const Fingerprint = require("express-fingerprint");
const cors = require("cors");
const { handleError } = require("./src/middlewares/handleErr");

app.use(cors({ origin: "*" }));

//cài đặt Fingerprint
app.use(Fingerprint());

app.use(express.json());

app.use("/api/v1", rootRouter);

app.use(handleError);

app.listen(process.env.PORT, async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
