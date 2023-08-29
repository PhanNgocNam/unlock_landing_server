const createError = "http-errors";
module.exports.badRequest = (err, res) => {
  const error = createError.BadRequest(err);
  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};
module.exports.interalServerError = (res) => {
  const error = createError.InternalServerError("Sai r");
  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};
module.exports.notFound = (req, res) => {
  const error = createError.NotFound("Khong tim thay duong dan");
  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};
module.exports.notAuth = (err, res) => {
  const error = createError.Unauthorized(err);
  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};
