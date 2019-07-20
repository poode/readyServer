const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const io = require('socket.io');

const app = express();
const server = http.createServer(app);
const socketServer = io(server);

const credentials = {
  key: fs.readFileSync(path.resolve(`${__dirname}/ssl/my-api.key`), 'utf8'),
  cert: fs.readFileSync(path.resolve(`${__dirname}/ssl/my-api.crt`), 'utf8'),
};

const serverSecure = https.createServer(credentials, app);
const socketServerSecure = io(serverSecure);


module.exports = {
  app,
  server,
  socketServer,
  serverSecure,
  socketServerSecure,
};
