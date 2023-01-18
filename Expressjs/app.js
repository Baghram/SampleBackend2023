const express = require("express");
const app = express();
const cors = require("cors");
const router = require('./router/index')


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(router);

module.exports = app;
