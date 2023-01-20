const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("testDatabase", "postgres", "asdf1234", {
  host: "localhost",
  dialect: "postgres",
});


module.exports = sequelize;
