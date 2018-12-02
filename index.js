const express = require('express');
require('dotenv').config();
const cluster = require('cluster');
const os = require('os');

const { logger } = require('./config/logger');
const { httpsServer } = require('./util/runningServerUsingHttps/httpsServer');

const app = express();
app.use(express.json());
require('./config/db');
require('./config/appConfiguration')(app);

function server(port) {
  if (JSON.parse(process.env.HTTPS)) return httpsServer(app);
  // eslint-disable-next-line no-else-return
  else return app.listen(port, () => logger.info(`server is up on http://localhost:${process.env.PORT}`));
}


function forkCPUs(serverReady) {
  // we can use process.env.WEB_CONCURRENCY if we know server concurrent connections that can handle
  const CPUS = os.cpus();

  if (cluster.isMaster) {
    CPUS.forEach(() => {
      cluster.fork();
    });
    cluster.on('listening', (worker) => {
      logger.info(`Worker Process ID: ${worker.process.pid}, Worker ID is: ${worker.id}`);
    });
    cluster.on('disconnect', (worker) => {
      logger.info(`Worker Process ID: ${worker.process.pid}, Worker ID is: ${worker.id}`);
    });
    cluster.on('exit', (worker) => {
    // Ensuring a new cluster will start if an old one dies
      logger.info(`Worker Process ID: ${worker.process.pid}, Worker ID is: ${worker.id}`);
      cluster.fork();
    });
  } else {
    serverReady(process.env.PORT);
  }
}

if (process.env.NODE_ENV === 'production') {
  forkCPUs(server);
} else {
  server(process.env.PORT);
}
