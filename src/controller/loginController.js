const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { adminLoginService } = require("../services/adminLoginService");
module.exports.createAdminAccount = async (req, res) => {
  const admin = await User.create({
    username: "admin",
    password: "admin",
    permissions: 1,
  });
  res.json({ admin });
};

module.exports.loginController = async (req, res, next) => {
  const { email, password } = req.body;
  adminLoginService(email, password).then(
    (admin) => {
      const accessToken = jwt.sign(
        {
          userID: admin.id,
          email: admin.username,
          permissions: admin.permissions,
        },
        process.env.SECRET_KEY
      );
      res.json({ accessToken });
    },
    (err) => {
      const error = new Error(err.message);
      error.status = "fail";
      error.statusCode = err.status;
      next(error);
    }
  );
};
