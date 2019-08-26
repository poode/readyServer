const paginate = require('express-paginate');

const { userRouter, userRoute } = require('./v1/user/userRoute');
const { authRouter, authRoute } = require('./v1/login/loginRoute');


const myRouter = (app) => {
  app.use(authRoute.BaseRoute, authRouter);
  app.use(paginate.middleware(10, 50)); // here we can add any middelware as needed like paginate
  app.use(userRoute.BaseRoute, userRouter);
};


module.exports = { myRouter };
