const jwt = require('jsonwebtoken');

const tokenService = {
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });
  },
};

module.exports = tokenService;