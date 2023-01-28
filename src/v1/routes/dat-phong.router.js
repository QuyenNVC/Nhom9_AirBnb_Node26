const express = require("express");
const authenticate = require("../middlewares/authenticated");
const datPhongController = require("../controllers/dat-phong.controller");
const routerDatPhong = express.Router();

routerDatPhong.get("", datPhongController.getAllDatPhong());
routerDatPhong.get("/:id", datPhongController.getDatPhongById());
routerDatPhong.get(
  "/lay-theo-nguoi-dung/:userId",
  datPhongController.getDatPhongByNguoiDung()
);
routerDatPhong.use(authenticate);
routerDatPhong.post("", datPhongController.createKhach());
routerDatPhong.put("/:maDatPhong", datPhongController.updateKhach());
routerDatPhong.delete("/:maDatPhong", datPhongController.deleteDatPhong());
module.exports = routerDatPhong;
