const {
  getAllPageElementService,
  updateTextElementService,
  updateImageElementService,
} = require("../services/pageElementService");
const { badRequest } = require("../middlewares/handleError");
const joi = require("joi");
const { part_id } = require("../helpers/joi_schema");

module.exports.getAllPageElement = async (req, res) => {
  try {
    const response = await getAllPageElementService(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json("Sai roi");
  }
};

module.exports.updateTextElement = async (req, res) => {
  try {
    const { error } = joi
      .object({ part_id })
      .validate({ part_id: req.body.part_id });

    if (error) {
      return badRequest(error.details[0].message, res);
    }

    const response = await updateTextElementService(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json("Not Authorization!");
  }
};

module.exports.updateImageElementController = async (req, res, next) => {
  const { id } = req.body;
  const filename = req.file?.filename || null;
  if (!filename) next(new Error("Invalid file!"));
  const imgInstance = updateImageElementService(id, filename);

  imgInstance.then((image) =>
    res.json({
      status: 200,
      payload: {
        [image.part_id]: image.content,
      },
    })
  );
};
