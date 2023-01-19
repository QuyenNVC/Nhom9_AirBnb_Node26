const express = require("express");
const routerBinhLuan = express.Router();
const binhLuanController = require("../controllers/binh-luan.controller");

routerBinhLuan.get("", binhLuanController.getAllBinhLuan());
module.exports = routerBinhLuan;
