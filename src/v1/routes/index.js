const express = require("express");

const v1 = express.Router();

v1.use("/auth", require("./auth.router"));
v1.use("/vi-tri", require("./viTri.router"));

module.exports = v1;
