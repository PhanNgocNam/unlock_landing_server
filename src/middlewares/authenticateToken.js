const jwt = require("jsonwebtoken");

module.exports.authenticateToken = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (!token)
    return res
      .sendStatus(401)
      .json({ status: 401, message: "Server không nhận được token!" });
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res
        .sendStatus(403)
        .json({ status: 403, message: "Token không hợp lệ!" });
    req.user = user;
    next();
  });
};
