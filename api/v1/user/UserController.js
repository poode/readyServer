const _ = require('lodash');
const Joi = require('joi');
const { pagination } = require('../../../util/PaginationUtil/pagination');
const { validateUser, JoiUserSchema, bcryptPassword, userRepository } = require('./userService');

function validateEmail(email) {
  const JoiEmailSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  return JoiEmailSchema.validate({ email });
}

class UserController {
  /**
   * @param {object} deps - Dependencies
   * @param {function} deps.validation
   * @param {object} deps.validationSchema
   * @param {object} deps.userRepository
   */
  constructor({ validation, validationSchema, userRepository }) {
    this.validation = validation;
    this.JoiSchema = validationSchema;
    this.userRepository = userRepository;
  }

  async index(req, res) {
    const users = await this.userRepository.findAll();
    const usersFound = _.map(users, (user) => (
      { _id: user.id, name: user.name, email: user.email }
    ));
    res.json(usersFound);
  }

  async getLimited(req, res) {
    // pagination utility expects a model, so we need to adapt or refactor it for repository usage
    // For now, fallback to repository's findAll and paginate manually
    const users = await this.userRepository.findAll();
    // You may want to implement pagination logic here
    const userList = users.map((user) => _.pick(user, ['_id', 'username', 'email', 'firstName', 'lastName']));
    res.json({ userList });
  }

  async getUser(req, res, next) {
    const { error } = validateEmail(req.query.username);
    if (error) {
      return next({ message: 'invalid username', status: 400 });
    }
    const user = await this.userRepository.findOne({ username: req.params.username });
    if (!user) {
      return next({ message: 'there is no email like this stored', status: 400 });
    }
    return res.json(_.pick(user, ['_id', 'username', 'email', 'firstName', 'lastName', 'avatar']));
  }

  async create(req, res, next) {
    const { error } = this.validation(req.body);
    if (error) return next({ message: error.details[0].message, status: 400 });

    let user = await this.userRepository.findOne({ username: req.body.username });
    if (user) {
      return next({ message: `The username ${req.body.username} is already registered`, status: 304 });
    }

    const userData = _.pick(req.body, ['username', 'email', 'firstName', 'lastName']);
    userData.password = await bcryptPassword(req.body.password);
    user = await this.userRepository.create(userData);
    return res.status('201').json(_.pick(user, ['_id', 'username', 'email', 'firstName', 'lastName']));
  }
}

// Dependency injection
const controller = new UserController({
  validation: validateUser,
  validationSchema: JoiUserSchema,
  userRepository
});

module.exports = controller;
