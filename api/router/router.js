const paginate = require('express-paginate');

const {
  authRoute,
  userRoute,
} = require('./appRouteList');
const users = require('../v1/user/userRoute');
const login = require('../v1/login/loginRoute');

exports.myRouter = (app) => {
  app.use(authRoute.BaseRoute, login);
  app.use(paginate.middleware(10, 50));
  app.use(userRoute.BaseRoute, users);
};
