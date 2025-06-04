const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../user/UserModel');
const { validateLogin } = require('./loginValidation');



async function authentication(reqBody) {
  const result = {
    message: '',
    error: '',
  };

  const { error } = validateLogin(reqBody);
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
  const token = await jwt.sign({ id: user.id, username: user.username }, process.env.APP_SECRET, { expiresIn: '30d' });
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
