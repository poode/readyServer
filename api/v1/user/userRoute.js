const router = require('express-promise-router')();

const { isAuthorized } = require('../../../middleware/authorization');
const UserController = require('./UserController');

const userRoute = {
  BaseRoute: `${process.env.SERVER_ROOT_URL}/users`,
  root: '/',
  userList: '/usersList',
  userByEmail: '/:username',
  registerUser: '/create',
};

router.all('*', isAuthorized)
  .get(userRoute.root, UserController.index.bind(UserController))
  .get(userRoute.userList, UserController.getLimited.bind(UserController))
  .get(userRoute.userByEmail, UserController.getUser.bind(UserController))
  .post(userRoute.registerUser, UserController.create.bind(UserController));

// router.put('/:id', UserController.update.bind(UserController));

// router.delete('/:id', UserController.destroy.bind(UserController));

module.exports = { userRouter: router, userRoute };
