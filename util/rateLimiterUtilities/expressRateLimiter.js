/* eslint-disable no-unused-vars */
/**
 * thanks for express-rate-limiter@npm
 */
const defaults = require('defaults');
const MemoryStore = require('./memoryStore');

function RateLimit(option) {
  const options = defaults(option, {
    // milliseconds - how long to keep records of requests in memory
    windowMs: 15 * 60 * 1000,
    // max number of recent connections during `window` milliseconds before sending a 429 response
    max: 100,
    message: 'Too many requests, please try again later.',
    statusCode: 429, // 429 status = Too Many Requests (RFC 6585)
    headers: true, // Send custom rate limit header with limit and remaining
    skipFailedRequests: false, // Do not count failed requests (status >= 400)
    skipSuccessfulRequests: false, // Do not count successful requests (status < 400)
    // allows to create custom keys (by default user IP is used)
    keyGenerator(req, res) {
      return {
        user: {
          id: res.locals.userId,
          email: res.locals.userEmail,
        },
        ip: req.ip,
      };
    },
    skip(/* req, res */) {
      return false;
    },
    handler(req, res, next) {
      // res.status(options.statusCode).send(options.message);
      const err = { message: options.message, status: options.statusCode };
      throw err;
    },
    onLimitReached(/* req, res, optionsUsed */) {},
  });

  // store to use for persisting rate limit data
  options.store = options.store || new MemoryStore(options.windowMs);

  // ensure that the store has the incr method
  if (
    typeof options.store.incr !== 'function'
    || typeof options.store.resetKey !== 'function'
    || (options.skipFailedRequests
      && typeof options.store.decrement !== 'function')
  ) {
    throw new Error('The store is not valid.');
  }


  function rateLimit(req, res, next) {
    if (options.skip(req, res)) {
      return next();
    }

    const key = options.keyGenerator(req, res);

    options.store.incr(key, (err, current, resetTime) => {
      if (err) {
        return next(err);
      }

      req.rateLimit = {
        limit: options.max,
        current,
        remaining: Math.max(options.max - current, 0),
        resetTime,
      };

      if (options.headers) {
        res.setHeader('X-RateLimit-Limit', options.max);
        res.setHeader('X-RateLimit-Remaining', req.rateLimit.remaining);
        if (resetTime instanceof Date) {
          // if we have a resetTime, also provide the current date
          // to help avoid issues with incorrect clocks
          res.setHeader('Date', new Date().toGMTString());
          res.setHeader(
            'X-RateLimit-Reset',
            Math.ceil(resetTime.getTime() / 1000),
          );
        }
      }

      if (options.max && current > options.max) {
        options.onLimitReached(req, res, options);
        if (options.headers) {
          res.setHeader('Retry-After', Math.ceil(options.windowMs / 1000));
        }
        return options.handler(req, res, next);
      }

      if (options.skipFailedRequests) {
        res.on('finish', () => {
          if (res.statusCode >= 400) {
            options.store.decrement(key);
          }
        });
      }

      if (options.skipSuccessfulRequests) {
        res.on('finish', () => {
          if (res.statusCode < 400) {
            options.store.decrement(key);
          }
        });
      }
      return next();
    });
    return false;
  }

  rateLimit.resetKey = options.store.resetKey.bind(options.store);

  // Backward compatibility function
  rateLimit.resetIp = rateLimit.resetKey;

  return rateLimit;
}

module.exports = RateLimit;
