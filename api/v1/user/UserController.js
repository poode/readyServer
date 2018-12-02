const _ = require('lodash');
const Joi = require('joi');

const { pagination } = require('../../../util/PaginationUtil/pagination');
const { validateUser, JoiUserSchema, bcryptPassword } = require('./userService');
const { User } = require('./UserModel');


function validateEmail(email) {
  const JoiEmailSchema = {
    email: Joi.string().email().required(),
  };
  return Joi.validate({ email }, JoiEmailSchema);
}

class UserController {
  /**
   *
   * @param function validation
   * @param validationSchema JoiSchema
   * @param DBModel model
   */
  constructor() {
    this.validation = validateUser;
    this.JoiSchema = JoiUserSchema;
    this.model = User;
  }

  async index(req, res) {
    const users = await this.model.find();
    const usersFound = _.map(users, user => ({ _id: user.id, name: user.name, email: user.email }));
    res.json(usersFound);
  }

  async getLimited(req, res) {
    const limitedUsersList = await pagination(this.model, req);
    const userList = limitedUsersList.data
      .map(user => _.pick(user, ['_id', 'username', 'email', 'firstName', 'lastName']));
    const userListMapped = _.pick(limitedUsersList,
      ['object', 'data', 'has_more', 'pageCount', 'itemCount', 'pages']);
    delete userListMapped.data;
    userListMapped.userList = userList;
    res.json(userListMapped);
  }

  async getUser(req, res, next) {
    const { error } = validateEmail(req.query.username);
    if (error) {
      return next({ message: 'invalid username', status: 400 });
    }
    const user = await this.model.findOne({ username: req.params.username });
    if (!user) {
      return next({ message: 'there is no email like this stored', status: 400 });
    }
    return res.json(_.pick(user, ['_id', 'username', 'email', 'firstName', 'lastName', 'avatar']));
  }

  async create(req, res, next) {
    const { error } = this.validation(req.body);
    if (error) return next({ message: error.details[0].message, status: 400 });

    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return next({ message: `The username ${req.body.username} is already registered`, status: 304 });
    }

    user = new User(_.pick(req.body, ['username', 'email', 'firstName', 'lastName']));
    user.password = await bcryptPassword(req.body.password);

    await user.save();
    return res.status('201').json(_.pick(user, ['_id', 'username', 'email', 'firstName', 'lastName']));
  }
}

module.exports = new UserController();
