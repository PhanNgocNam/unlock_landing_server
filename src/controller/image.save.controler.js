module.exports.saveController = (req, res) => {
  return res.status(200).json({
    status: 200,
    payload: [
      `${process.env.HOST}/assets/images/thumb-${req.file.filename}`,
      `${process.env.HOST}/assets/images/${req.file.filename}`,
    ],
  });
};
