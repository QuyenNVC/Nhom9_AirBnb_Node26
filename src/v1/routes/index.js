const express = require("express");

const v1 = express.Router();

v1.use("/auth", require("./auth.router"));
v1.use("/vi-tri", require("./viTri.router"));
v1.use("/phong-thue", require("./phong.router"));
v1.use("/users", require("./user.router"));
module.exports = v1;
