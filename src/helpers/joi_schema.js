const joi = require("joi");

module.exports.part_id = joi.string().required();
module.exports.content = joi.string().required();
module.exports.isDeleted = joi.number().required();
module.exports.permision = joi.number().required();
module.exports.special = joi.number().required();
