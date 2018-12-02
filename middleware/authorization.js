const jwt = require('jsonwebtoken');

// const { getUser } = require('../services/user.service');

async function isAuthorized(req, res, next) {
  if (req.path === '/create') return next();
  const token = req.get('x-auth-token');
  if (!token) {
    next({ message: 'I don\'t know you, who are you?!', status: 403 });
    return false;
  }
  jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
    if (err) {
      next(err);
      return false;
    }
    const {
      id, username, iat, exp,
    } = decoded;
    if (!username) {
      next({ message: 'invalid token', status: 403 });
      return false;
    }
    res.header('x-auth-token-creation', iat);
    res.header('x-auth-token-expiry', exp);
    res.locals.userId = id;
    res.locals.username = username;
    next();
    return false;
  });
  return false;
}

module.exports = {
  isAuthorized,
};
