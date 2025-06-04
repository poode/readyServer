/* eslint-disable no-unused-vars */
const _ = require('lodash');
const errorLogger = require('./errorLogger');

process.on('unhandledRejection', (err) => {
  throw err;
});

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});

module.exports = (err, req, res, next) => {
  if (err.name === 'TokenExpiredError') {
    err.status = 403;
    err.message = `your session has been expired at ${err.expiredAt}`;
  }

  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }

  errorLogger(err, req);
  return res.status(err.status).json({ error: _.pick(error, ['message', 'status']) });
};
