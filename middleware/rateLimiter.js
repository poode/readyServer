const rateLimit = require('../util/rateLimiterUtilities/expressRateLimiter');

// only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// app.enable('trust proxy');

class RateLimiter {
  constructor(time, maxNumberOfRequests) {
    this.limiter = rateLimit({
      windowMs: time * 60 * 1000, // 15 minutes
      max: maxNumberOfRequests, // limit each IP to 100 requests per windowMs
    });
  }
}

module.exports = {
  RateLimiter,
};
