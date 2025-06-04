const { logger } = require('../config/logger');

const errorLogger = (err, req) => {
  const error = {
    message: err.message,
    requestedUrl: req.url,
    requestedMethod: req.method,
    status: err.status,
    stack: err.stack,
  };
  logger.error(JSON.stringify(error, ['message', 'requestedUrl', 'requestedMethod', 'status']));
};

module.exports = errorLogger;