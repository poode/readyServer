const { authentication } = require('./loginService');

async function index(req, res, next) {
  const { message, error } = await authentication(req.body);
  if (error) return next(error);
  return res.header('x-auth-token', message.token).send(message);
}

module.exports = {
  index,
};
