class UserRepository {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async findAll() {
    return this.UserModel.find();
  }

  async findOne(query) {
    return this.UserModel.findOne(query);
  }

  async create(userData) {
    const user = new this.UserModel(userData);
    return user.save();
  }
}

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  email: {
    type: String,
    maxlength: 255,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  firstName: {
    type: String,
    minlength: 6,
    maxlength: 255,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  avatar: {
    type: String,
    maxlength: 500,
    default: null,
  },
});

const User = mongoose.model('User', userSchema);
const userRepository = new UserRepository(User);

module.exports = {
  User,
  UserRepository,
  userRepository
};
