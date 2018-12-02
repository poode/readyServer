const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { User } = require('../user/UserModel');

const JoiLoginSchema = {
  username: Joi.string().min(6).max(255).required(),
  password: Joi.string().min(8).max(255).required(),
};

function validation(credentials) {
  return Joi.validate(credentials, JoiLoginSchema);
}

async function tokenGenerator(id, username) {
  const token = await jwt.sign({ id, username }, process.env.APP_SECRET, { expiresIn: '30d' });
  return token;
}

async function authentication(reqBody) {
  const result = {
    message: '',
    error: '',
  };

  const { error } = validation(reqBody);
  if (error) {
    result.error = { message: error.details[0].message, status: 400 };
    return result;
  }

  const user = await User.findOne({ username: reqBody.username });
  if (!user) {
    result.error = { message: 'user is not found in our databases', status: 404 };
    return result;
  }

  const match = await bcrypt.compare(reqBody.password, user.password);
  if (!match) {
    result.error = { message: 'the entered username or password is invalid!', status: 400 };
    return result;
  }
  const token = await tokenGenerator(user.id, user.username);
  result.message = {
    authenticated: true,
    userId: user.id,
    username: user.username,
    token,
  };
  return result;
}

module.exports = {
  authentication,
};
