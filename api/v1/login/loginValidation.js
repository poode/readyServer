const Joi = require('joi');

const JoiLoginSchema = {
  username: Joi.string().min(6).max(255).required(),
  password: Joi.string().min(8).max(255).required(),
};

function validateLogin(credentials) {
  return Joi.validate(credentials, JoiLoginSchema);
}

module.exports = {
  JoiLoginSchema,
  validateLogin,
};