const express = require('express');
require('dotenv').config();
const cluster = require('cluster');
const os = require('os');
const io = require('socket.io');

const { logger } = require('./config/logger');
const { httpsServer } = require('./util/runningServerUsingHttps/httpsServer');

const app = express();
app.use(express.json());
require('./config/db');
require('./config/appConfiguration')(app);

function server(port) {
  if (JSON.parse(process.env.HTTPS)) {
    const socket = httpsServer(app);
    return socket;
    // eslint-disable-next-line brace-style
  }
  // eslint-disable-next-line no-else-return
  else {
    const serverObj = app.listen(port, () => {
      logger.info(`server is up on http://localhost:${process.env.PORT}`);
    });
    const socket = io(serverObj);
    return socket;
  }
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
    return serverReady(process.env.PORT);
  }
  return false;
}

if (process.env.NODE_ENV === 'production') {
  forkCPUs(server);
} else {
  const socketServer = server(process.env.PORT);
  // socket is here @TODO handl it outside index to make socket standalone module
  socketServer.on('connection', (socket) => {
    socket.emit('welcome', { message: 'Welcome to server socket!' });

    socket.on('cool', (socData) => {
      logger.info(socData);
    });
  });
}
