const Joi = require('joi');

// Joi.validate() was removed in Joi 16+; validate via the compiled schema instead.
const JoiLoginSchema = Joi.object({
  username: Joi.string().min(6).max(255).required(),
  password: Joi.string().min(8).max(255).required(),
});

function validateLogin(credentials) {
  return JoiLoginSchema.validate(credentials);
}

module.exports = {
  JoiLoginSchema,
  validateLogin,
};
