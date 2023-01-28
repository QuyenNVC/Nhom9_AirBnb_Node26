const express = require("express");
const authenticate = require("../middlewares/authenticated");
const datPhongController = require("../controllers/dat-phong.controller");
const isAdmin = require("../middlewares/isAdmin");
const routerDatPhong = express.Router();

routerDatPhong.use(authenticate);
routerDatPhong.get("/:id", datPhongController.getDatPhongById());
routerDatPhong.get(
  "/lay-theo-nguoi-dung/:userId",
  datPhongController.getDatPhongByNguoiDung()
);
routerDatPhong.post("", datPhongController.createKhach());

routerDatPhong.use(isAdmin);
routerDatPhong.get("", datPhongController.getAllDatPhong());
routerDatPhong.put("/:maDatPhong", datPhongController.updateKhach());
routerDatPhong.delete("/:maDatPhong", datPhongController.deleteDatPhong());
module.exports = routerDatPhong;
