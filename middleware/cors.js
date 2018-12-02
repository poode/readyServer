const cors = require('cors');

const corsOptions = {
  origin: `http://localhost:${process.env.PORT}`,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = cors(corsOptions);
