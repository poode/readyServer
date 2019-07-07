const cors = require('cors');

const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // credentials: true,
  allowedHeaders: ['x-auth-token', 'Content-Type', 'Authorization', 'Access-Control-Allow-Credentials', 'Access-Control-Request-Method', 'Access-Control-Allow-Headers'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = cors(corsOptions);
