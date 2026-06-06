const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const io = require('socket.io');

const app = express();
const server = http.createServer(app);
const socketServer = io(server);

// HTTPS is optional. TLS material is NOT committed to the repo — provide your own
// key/cert under config/ssl/, or keep HTTPS=false to run plain HTTP.
let serverSecure = null;
let socketServerSecure = null;

if (JSON.parse(process.env.HTTPS || 'false')) {
  const credentials = {
    key: fs.readFileSync(path.resolve(`${__dirname}/ssl/my-api.key`), 'utf8'),
    cert: fs.readFileSync(path.resolve(`${__dirname}/ssl/my-api.crt`), 'utf8'),
  };
  serverSecure = https.createServer(credentials, app);
  socketServerSecure = io(serverSecure);
}

module.exports = {
  app,
  server,
  socketServer,
  serverSecure,
  socketServerSecure,
};
