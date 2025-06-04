const User = require('./UserModel');

const userRepository = {
  findAll: async () => {
    return User.find({});
  },
  findOne: async (query) => {
    return User.findOne(query);
  },
  create: async (userData) => {
    const user = new User(userData);
    return user.save();
  },
};

module.exports = userRepository;