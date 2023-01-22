const express = require("express");
const routerBinhLuan = express.Router();
const binhLuanController = require("../controllers/binh-luan.controller");
const authenticated = require("../middlewares/authenticated");

routerBinhLuan.get("", binhLuanController.getAllBinhLuan());
routerBinhLuan.get(
  "/lay-binh-luan-theo-phong/:maPhong",
  binhLuanController.getAllBinhLuanTheoPhong()
);
routerBinhLuan.use(authenticated);
routerBinhLuan.post("", binhLuanController.createBinhLuan());
routerBinhLuan.put("/:idComment", binhLuanController.updateBinhLuan());
routerBinhLuan.delete("/:idComment", binhLuanController.deleteBinhLuan());
module.exports = routerBinhLuan;
