module.exports.checkPermission = (permissions) => {
  return (req, res, next) => {
    if (!permissions.includes(req.user.permissions))
      return res
        .status(403)
        .json({ status: 403, message: "Bạn không có quyền chỉnh sửa!" });
    next();
  };
};
