const jwt = require('jsonwebtoken');

async function isAuthorized(req, res, next) {
  if (req.path === '/create') return next();
  const token = req.get('Authorization');
  if (!token) {
    return next({ message: "I don't know you, who are you?!", status: 403 });
  }
  jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
    if (err) {
      // Do not leak stack traces
      return next({ message: 'Invalid or expired token', status: 403 });
    }
    const {
      id, username, iat, exp,
    } = decoded;
    if (!username) {
      return next({ message: 'invalid token', status: 403 });
    }
    res.header('Authorization-creation', iat);
    res.header('Authorization-expiry', exp);
    res.locals.userId = id;
    res.locals.username = username;
    next();
  });
}

module.exports = {
  isAuthorized,
};
