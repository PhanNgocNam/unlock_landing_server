const sharp = require("sharp");

module.exports.resizeImage = (req, res, next) => {
  sharp(req.file?.path)
    .resize(330, 330, {
      fit: "contain",
      background: {
        r: 0,
        g: 0,
        b: 0,
        alpha: 0,
      },
    })
    .toFile(`${req.file.destination}` + `thumb-${req.file.filename}`);
  next();
};
