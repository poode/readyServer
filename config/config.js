require('dotenv').config();

const configuration = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
};

module.exports = {
  development: configuration,
  test: configuration,
  production: configuration,
};
