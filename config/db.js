const mongoose = require('mongoose');
const { logger } = require('./logger');


const URL = `${process.env.DB_TYPE}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}${process.env.CUSTOM_DB_URL}`;

mongoose.connect(URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', () => logger.info('Unable to connect to Database...'));

db.on('open', () => logger.info('Connected to Database...'));

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
if (process.env.NODE_ENV === 'dev') mongoose.set('debug', true);

module.exports = {
  mongoose,
};
