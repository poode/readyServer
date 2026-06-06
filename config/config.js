require('dotenv').config();

/**
 * Sequelize configuration (used when DB_TYPE=mysql and by sequelize-cli).
 */
const configuration = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false,
};

module.exports = {
  development: configuration,
  test: configuration,
  production: configuration,
};
