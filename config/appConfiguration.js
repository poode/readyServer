const compression = require('compression');

const { myRouter } = require('../api/router');
const errorHandler = require('../middleware/errorHandler');
const logHandler = require('../middleware/logHandler');
const corsMiddleware = require('../middleware/cors');
const helmetMiddleware = require('../middleware/helmet');
const RateLimit = require('../util/rateLimiterUtilities/expressRateLimiter');
const { tooBusyMiddleware } = require('../middleware/tooBusy');
const { translatorMiddleware } = require('../middleware/translator');
const { graphqlMiddleware } = require('../middleware/graphql');

module.exports = (app, io) => {
  app.use(compression());
  app.use(helmetMiddleware);
  app.use(logHandler);
  app.use(tooBusyMiddleware);
  app.use(corsMiddleware);
  app.use((req, res, next) => {
    res.locals.io = io;
    next();
  });
  if (process.env.APP_ENV === 'production') {
    app.use(RateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
    app.use(translatorMiddleware);
    graphqlMiddleware(app);
  } else {
    app.use(translatorMiddleware);
    graphqlMiddleware(app);
    app.use(RateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
  }
  app.get('/', (req, res) => {
    // test in socket connection on opeing root route
    res.locals.io.emit('serverStart', { message: 'welcome to socket Server from root route' });
    return res.json({ message: 'Server is up and running...' });
  });
  // myRouter(app);
  app.use('*', (req, res) => {
    const error = {
      message: 'I don\'t blame you.It is my mistake, or may be you\'re calling a wrong endpoint',
      status: 404,
    };
    res.status(404).json(error);
  });
  app.use(errorHandler);
};
