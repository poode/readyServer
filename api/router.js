const paginate = require('express-paginate');

// const { userRouter, userRoute } = require('./v1/user/userRoute');
// const { authRouter, authRoute } = require('./v1/login/loginRoute');
const { userRouter, userRoute } = require('./v1/user').router;
const { authRouter, authRoute } = require('./v1/login').router;

const myRouter = (app) => {
  app.use(authRoute.BaseRoute, authRouter);
  // here we can add any middleware as needed like paginate.middleware
  app.use(paginate.middleware(10, 50));
  app.use(userRoute.BaseRoute, userRouter);
};


module.exports = { myRouter };
