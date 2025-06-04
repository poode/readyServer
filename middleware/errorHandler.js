/* eslint-disable no-unused-vars */
const _ = require('lodash');
const { logger } = require('../config/logger');

process.on('unhandledRejection', (err) => {
  throw err;
});

process.on('uncaughtException', (err) => {
  const error = { message: err.message, stack: err.stack };
  logger.error(error);
  process.exit(1);
});

module.exports = (err, req, res, next) => {
  if (err.name === 'TokenExpiredError') {
    err.status = 403;
    err.message = `your session has been expired at ${err.expiredAt}`;
  }

  if (!err.status) {
    logger.error({ message: err.message, stack: err.stack });
    // Do not exit the process for runtime errors, just respond with 500
    err.status = 500;
    err.message = 'Internal Server Error';
  }

  const error = {
    message: err.message,
    requestedUrl: req.url,
    requestedMethod: req.method,
    status: err.status,
    stack: err.stack,
  };
  logger.error(JSON.stringify(error, ['message', 'requestedUrl', 'requestedMethod', 'status']));
  return res.status(err.status).json({ error: _.pick(error, ['message', 'status']) });
};
