const https = require('https');
const fs = require('fs');
const path = require('path');
const { logger } = require('../../config/logger');

const credentials = {
  key: fs.readFileSync(path.resolve(`${__dirname}/my-api.key`), 'utf8'),
  cert: fs.readFileSync(path.resolve(`${__dirname}/my-api.crt`), 'utf8'),
};

function httpsServer(app) {
  https
    .createServer(credentials, app)
    .listen(process.env.PORT, () => logger.info(`server is up on https://localhost:${process.env.PORT}`));
}

module.exports = {
  httpsServer,
};
