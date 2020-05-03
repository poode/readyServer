/* eslint-disable no-nested-ternary */
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, jsonPointers: true });
require('ajv-errors')(ajv /* , {singleError: true} */);

const validate = (schema) => (req, res, next) => {
  const requestPayload = req.method === 'POST' ? req.body : req.method === 'GET' ? req.query : {};
  const validateMe = ajv.compile(schema);
  const valid = validateMe(requestPayload);
  if (valid) {
    return next();
  }
  // string with all errors and data paths
  return res.status(400).json(validate.errors.map((error) => error.params));
};

module.exports.validate = validate;
