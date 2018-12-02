const Joi = require('joi');
const bcrypt = require('bcrypt');

const { User } = require('./UserModel');

const JoiUserSchema = {
  username: Joi.string().min(6).max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(255).required(),
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
};

function validateUser(user) {
  return Joi.validate(user, JoiUserSchema);
}

async function bcryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function getUser(email) {
  const user = await User.findOne({ email });
  return user;
}

module.exports = {
  JoiUserSchema,
  validateUser,
  bcryptPassword,
  getUser,
};
