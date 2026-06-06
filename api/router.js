const paginate = require('express-paginate');
const { logger } = require('../config/logger');

const { userRouter, userRoute } = require('./v1/user').router;
const { authRouter, authRoute } = require('./v1/login').router;

const myRouter = (app) => {
  app.use(authRoute.BaseRoute, authRouter);
  // Add shared route-level middleware here (e.g. pagination).
  app.use(paginate.middleware(10, 50));
  app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.originalUrl}`);
    next();
  });
  app.use(userRoute.BaseRoute, userRouter);
};

module.exports = { myRouter };
