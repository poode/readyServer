const errorLogger = require('./errorLogger');
const { logger } = require('../config/logger');

process.on('unhandledRejection', (err) => {
  throw err;
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', err);
  process.exit(1);
});

// Express error-handling middleware must declare 4 args, even if `next` is unused.
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let { status, message } = err;

  if (err.name === 'TokenExpiredError') {
    status = 403;
    message = `your session has been expired at ${err.expiredAt}`;
  }

  if (!status) {
    status = 500;
    message = 'Internal Server Error';
  }

  errorLogger({ message, status, stack: err.stack }, req);
  return res.status(status).json({ error: { message, status } });
};
