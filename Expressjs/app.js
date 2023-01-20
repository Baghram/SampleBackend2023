const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/index");
const sequelize = require("./config/sequelize");
const User = require("./model/userModel");

try {
  sequelize.authenticate();
  User.sync({ logging: false });
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(router);
} catch (error) {
  console.log(error);
}

module.exports = app;
