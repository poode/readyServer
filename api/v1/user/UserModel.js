/**
 * Mongoose User schema (active when DB_TYPE=mongodb).
 * The Sequelize equivalent lives in models/user.js.
 */
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
    required: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 255,
  },
  avatar: {
    type: String,
    maxlength: 500,
    default: null,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = { User };
