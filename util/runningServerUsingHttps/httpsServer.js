const https = require('https');
const fs = require('fs');
const path = require('path');
const io = require('socket.io');

const { logger } = require('../../config/logger');

const credentials = {
  key: fs.readFileSync(path.resolve(`${__dirname}/my-api.key`), 'utf8'),
  cert: fs.readFileSync(path.resolve(`${__dirname}/my-api.crt`), 'utf8'),
};

function httpsServer(app) {
  const server = https
    .createServer(credentials, app)
    .listen(process.env.PORT, () => {
      logger.info(`server is up on https://localhost:${process.env.PORT}`);
    });
  const socket = io(server);
  return socket;
}

module.exports = {
  httpsServer,
};
