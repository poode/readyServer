/* eslint-disable no-console */

/**
 *
 *
 * @param {*} msg
 */
function slog(msg) {
  if (process.env.NODE_ENV === 'dev') {
    console.log(`${msg} ===> `, msg);
  }
}


module.exports = {
  slog,
};
