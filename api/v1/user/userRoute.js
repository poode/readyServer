const router = require('express-promise-router')();

const { isAuthorized } = require('../../../middleware/authorization');
const UserController = require('./UserController');
const { userRoute } = require('../../router/appRouteList');

const {
  root,
  userByEmail,
  userList,
  registerUser,
} = userRoute;


router.all('*', isAuthorized)
  .get(root, UserController.index.bind(UserController))
  .get(userList, UserController.getLimited.bind(UserController))
  .get(userByEmail, UserController.getUser.bind(UserController))
  .post(registerUser, UserController.create.bind(UserController));

// router.put('/:id', UserController.update.bind(UserController));

// router.delete('/:id', UserController.destroy.bind(UserController));

module.exports = router;
