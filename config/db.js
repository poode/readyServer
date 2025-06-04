/**
 * This Database file configuration for mongodb
 */

const mongoose = require('mongoose');
const { logger } = require('./logger');


const URL = process.env.CUSTOM_DB_URL || `${process.env.DB_TYPE}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
logger.info(`DB URL ${URL}`);

mongoose.Promise = global.Promise;
mongoose.connect(URL)
    .then(() => {
      logger.info('Connected to Database...')
    })
    .catch(e => {
      logger.error('Unable to connect to Database...', e)
      process.exit(0);
    });

if (process.env.NODE_ENV === 'dev') mongoose.set('debug', true);

module.exports = {
  mongoose,
};
