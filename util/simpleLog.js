/* eslint-disable no-console */

/**
 *
 *
 * @param { string } msg
 * @param { Object } object
 */
function slog(msg, object) {
  if (process.env.NODE_ENV === 'dev') {
    console.log(`${msg} ===>>> `, object);
  }
}


module.exports = {
  slog,
};
