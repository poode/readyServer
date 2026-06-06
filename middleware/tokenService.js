const jwt = require('jsonwebtoken');

const tokenService = {
  verifyToken: (token) => new Promise((resolve, reject) => {
    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  }),
};

module.exports = tokenService;
