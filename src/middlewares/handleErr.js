module.exports.handleError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Oops, Something Went Wrong!";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};
