const bcrypt = require('bcrypt');
const userRepository = require('./userRepository');

async function bcryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function getUser(email) {
  return userRepository.findOne({ email });
}

module.exports = {
  bcryptPassword,
  getUser,

};
