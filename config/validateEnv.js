/**
 * Fail fast on misconfiguration: validate required environment variables at boot.
 */
const REQUIRED = ['APP_SECRET', 'PORT', 'DB_TYPE'];
const SUPPORTED_DB_TYPES = ['mongodb', 'mysql'];

function validateEnv() {
  const missing = REQUIRED.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  const dbType = (process.env.DB_TYPE || '').toLowerCase();
  if (!SUPPORTED_DB_TYPES.includes(dbType)) {
    throw new Error(`DB_TYPE must be one of: ${SUPPORTED_DB_TYPES.join(', ')}`);
  }
}

module.exports = { validateEnv };
