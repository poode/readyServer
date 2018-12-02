const tooBusy = require('toobusy-js');

exports.tooBusyMiddleware = (req, res, next) => {
  if (tooBusy()) {
    const err = { message: 'I\'m busy right now, sorry.', status: 503 };
    throw err;
  } else {
    next();
  }
};
