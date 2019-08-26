const compression = require('compression');

const { myRouter } = require('../api/router');
const errorHandler = require('../middleware/errorHandler');
const logHandler = require('../middleware/logHandler');
const corsMiddleware = require('../middleware/cors');
const helmetMiddleware = require('../middleware/helmet');
const { RateLimiter } = require('../middleware/rateLimiter');
const { tooBusyMiddleware } = require('../middleware/tooBusy');
const { translatorMiddleware } = require('../middleware/translator');

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
  app.use(new RateLimiter(15, 100).limiter);
  app.use(translatorMiddleware);
  app.get('/', (req, res) => {
    // test in socket connection on opeing root route
    res.locals.io.emit('serverStart', { message: 'welcome to socket Server from root route' });
    return res.json({ message: 'Server is up and running...' });
  });
  myRouter(app);
  app.use('*', (req, res) => {
    const error = {
      message: 'I don\'t blame you.It is my mistake, or may be you\'re calling a wrong endpoint',
      status: 404,
    };
    res.status(404).json(error);
  });
  app.use(errorHandler);
};
