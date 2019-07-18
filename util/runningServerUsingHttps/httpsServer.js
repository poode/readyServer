const https = require('https');
const fs = require('fs');
const path = require('path');
const io = require('socket.io');
const { app } = require('../../config/socket');


const credentials = {
  key: fs.readFileSync(path.resolve(`${__dirname}/my-api.key`), 'utf8'),
  cert: fs.readFileSync(path.resolve(`${__dirname}/my-api.crt`), 'utf8'),
};

const appSecure = app;
const serverSecure = https.createServer(credentials, appSecure);
const socketServerSecure = io(serverSecure);


module.exports = {
  appSecure,
  serverSecure,
  socketServerSecure,
};
