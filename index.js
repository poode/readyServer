/* eslint-disable global-require */
const express = require('express');
require('dotenv').config();
const cluster = require('cluster');
const os = require('os');

const {
  app,
  server,
  socketServer,
  serverSecure,
  socketServerSecure,
} = require('./config/socket');

const { logger } = require('./config/logger');
const { slog } = require('./util/simpleLog');


app.use(express.json());
require('./config/db');

function serverStart(port) {
  if (JSON.parse(process.env.HTTPS)) {
    require('./config/appConfiguration')(app, socketServerSecure);
    return serverSecure.listen(port, () => {
      logger.info(`server is up on https://localhost:${port}`);
    });
  }

  require('./config/appConfiguration')(app, socketServer);
  return server.listen(port, () => {
    logger.info(`server is up on http://localhost:${port}`);
  });
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
  forkCPUs(serverStart);
} else {
  serverStart(process.env.PORT);
}

// we can useuser socketServer or socketServerSecure if https enabled
// however there is io poperty in res.locals whcih is socket server
// and we can use with any place on the app\

// test for socket connection
socketServer.on('connection', (socket) => {
  socket.on('cool', data => slog(data));
  setInterval(() => {
    socket.emit('welcome', { message: 'welcome to the socket server', time: Date() });
  }, 1000);
});
