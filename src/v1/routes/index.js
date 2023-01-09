const express = require("express");

const v1 = express.Router();

v1.use("/", require("./auth.router"));

module.exports = v1;
