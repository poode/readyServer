const router = require('express-promise-router')();

const { index } = require('./LoginController');

const authRoute = {
  BaseRoute: `${process.env.SERVER_ROOT_URL}/login`,
  root: '/',
};


router.post(authRoute.root, index);

module.exports = { authRouter: router, authRoute };
