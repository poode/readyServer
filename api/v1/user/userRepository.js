/* eslint-disable global-require */
// Lazy require()s are intentional: load only the model for the active ORM (DB_TYPE).
/**
 * User repository — the only place that touches the database for the user entity.
 *
 * Delegates to the ORM selected by DB_TYPE. Both implementations expose the
 * same interface (findAll, findOne, create) and accept plain query objects,
 * so services and controllers stay ORM-agnostic.
 */
const { DB_TYPE } = require('../../../config/db');

function mongoRepository() {
  const { User } = require('./UserModel');
  return {
    findAll: () => User.find({}),
    findOne: (query) => User.findOne(query),
    create: (userData) => new User(userData).save(),
  };
}

function sequelizeRepository() {
  const db = require('../../../models');
  return {
    findAll: () => db.User.findAll(),
    findOne: (query) => db.User.findOne({ where: query }),
    create: (userData) => db.User.create(userData),
  };
}

module.exports = DB_TYPE === 'mysql' ? sequelizeRepository() : mongoRepository();
