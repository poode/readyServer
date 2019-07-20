/* eslint-disable no-unused-vars */
const _ = require('lodash');
const { logger } = require('../config/logger');


process.on('unhandledRejection', (err) => {
  throw err;
});

process.on('uncaughtException', (err) => {
  const error = { message: err.message, stack: err.stack };
  logger.error(error);
  process.exit();
});

class ServerError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}
module.exports = (err, req, res, next) => {
  const ErrorObj = new ServerError(err.message, err.status);
  if (!ErrorObj.status) ErrorObj.status = 500;
  if (err.name === 'TokenExpiredError') {
    ErrorObj.status = 403;
    ErrorObj.message = `your session has been expired at ${err.expiredAt}`;
  }

  const error = {
    message: ErrorObj.message,
    requestedUrl: req.url,
    requestedMethod: req.method,
    status: ErrorObj.status,
    stack: ErrorObj.stack,
  };
  logger.error(JSON.stringify(error, ['message', 'requestedUrl', 'requestedMethod', 'status']));
  return res.status(ErrorObj.status).json({ error: _.pick(error, ['message', 'status']) });
};
