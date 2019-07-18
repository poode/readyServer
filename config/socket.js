const http = require('http');
const express = require('express');
const io = require('socket.io');

const app = express();
const server = http.createServer(app);
const socketServer = io(server);

module.exports = { app, server, socketServer };
