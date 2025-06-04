const Joi = require('joi');

const JoiUserSchema = Joi.object({
  username: Joi.string().min(6).max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(255).required(),
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
});

function validateUser(user) {
  return JoiUserSchema.validate(user);
}

function validateEmail(email) {
  const JoiEmailSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  return JoiEmailSchema.validate({ email });
}

module.exports = {
  JoiUserSchema,
  validateUser,
  validateEmail,
};