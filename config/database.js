const mongoose = require("mongoose");
require("dotenv/config");

const connection = mongoose.createConnection(process.env.DB_STRING, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

module.exports = connection;
