const router = require('express-promise-router')();

const { isAuthorized } = require('../../../middleware/authorization');
const UserController = require('./UserController');

const userRoute = {
  BaseRoute: `${process.env.SERVER_ROOT_URL}/users`,
  root: '/',
  userList: '/usersList',
  userByUsername: '/:username',
  registerUser: '/create',
};

// Public route: user registration requires no token.
router.post(userRoute.registerUser, UserController.create.bind(UserController));

// Everything below this guard requires a valid Authorization token.
router.all('*', isAuthorized);
router.get(userRoute.root, UserController.index.bind(UserController));
router.get(userRoute.userList, UserController.getLimited.bind(UserController));
router.get(userRoute.userByUsername, UserController.getUser.bind(UserController));

module.exports = { userRouter: router, userRoute };
