/* eslint-disable global-require */
// Lazy require()s are intentional here: only the ORM selected by DB_TYPE is loaded.
/**
 * Database bootstrap.
 *
 * Selects the active ORM/driver from the DB_TYPE environment variable:
 *   DB_TYPE=mongodb -> Mongoose (MongoDB)
 *   DB_TYPE=mysql   -> Sequelize (MySQL)
 *
 * Only the selected stack is required and connected, so the unused driver
 * is never loaded. Repositories read DB_TYPE to pick the matching model.
 */
const { logger } = require('./logger');

const DB_TYPE = (process.env.DB_TYPE || 'mongodb').toLowerCase();

async function connectMongo() {
  const mongoose = require('mongoose');
  const auth = process.env.DB_USERNAME
    ? `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@`
    : '';
  const url = process.env.CUSTOM_DB_URL
    || `mongodb://${auth}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  mongoose.Promise = global.Promise;
  if (process.env.NODE_ENV === 'dev') mongoose.set('debug', true);

  await mongoose.connect(url);
  logger.info('Connected to MongoDB via Mongoose');
  return mongoose;
}

async function connectSequelize() {
  const db = require('../models');
  await db.sequelize.authenticate();
  await db.sequelize.sync();
  logger.info('Connected to MySQL via Sequelize');
  return db.sequelize;
}

async function connectDatabase() {
  try {
    if (DB_TYPE === 'mysql') return await connectSequelize();
    return await connectMongo();
  } catch (err) {
    logger.error(`Unable to connect to the ${DB_TYPE} database`, err);
    process.exit(1);
  }
  return null;
}

module.exports = { DB_TYPE, connectDatabase };
