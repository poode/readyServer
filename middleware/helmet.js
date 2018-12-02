const helmet = require('helmet');

module.exports = helmet({
  crossdomain: false,
  noCache: true,
  referrerPolicy: true,
});
