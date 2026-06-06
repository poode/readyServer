const _ = require('lodash');
const { bcryptPassword } = require('./userService');
const userRepository = require('./userRepository');
const { validateUser } = require('./userValidation');

// Fields safe to return to clients (works for both Mongoose `_id` and Sequelize `id`).
const PUBLIC_FIELDS = ['_id', 'id', 'username', 'email', 'firstName', 'lastName', 'avatar'];
const toPublic = (user) => _.pick(user.toJSON ? user.toJSON() : user, PUBLIC_FIELDS);

class UserController {
  /**
   * @param {object} deps
   * @param {function} deps.validation - request-body validator returning { error }
   * @param {object} deps.userRepository - { findAll, findOne, create }
   */
  constructor({ validation, userRepository: repository }) {
    this.validation = validation;
    this.userRepository = repository;
  }

  async index(req, res) {
    const users = await this.userRepository.findAll();
    return res.json(users.map(toPublic));
  }

  async getLimited(req, res) {
    const users = await this.userRepository.findAll();
    return res.json({ userList: users.map(toPublic) });
  }

  async getUser(req, res, next) {
    const user = await this.userRepository.findOne({ username: req.params.username });
    if (!user) {
      return next({ message: 'no user found with this username', status: 404 });
    }
    return res.json(toPublic(user));
  }

  async create(req, res, next) {
    const { error } = this.validation(req.body);
    if (error) return next({ message: error.details[0].message, status: 400 });

    const existing = await this.userRepository.findOne({ username: req.body.username });
    if (existing) {
      return next({ message: `The username ${req.body.username} is already registered`, status: 409 });
    }

    const userData = _.pick(req.body, ['username', 'email', 'firstName', 'lastName']);
    userData.password = await bcryptPassword(req.body.password);
    const user = await this.userRepository.create(userData);
    return res.status(201).json(toPublic(user));
  }
}

// Dependency injection wiring.
const controller = new UserController({
  validation: validateUser,
  userRepository,
});

module.exports = controller;
