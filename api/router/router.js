const paginate = require('express-paginate');

const users = require('../v1/user/userRoute');
const login = require('../v1/login/loginRoute');

const {
  authRoute,
  userRoute,
} = {
  authRoute: {
    BaseRoute: '/api/v1/login',
    root: '/',
  },
  userRoute: {
    BaseRoute: '/api/v1/users',
    root: '/',
    userList: '/usersList',
    userByEmail: '/:username',
    registerUser: '/create',
  },
};

exports.myRouter = (app) => {
  app.use(authRoute.BaseRoute, login);
  app.use(paginate.middleware(10, 50));
  app.use(userRoute.BaseRoute, users);
};
