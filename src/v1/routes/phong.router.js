const { Router } = require("express");
const {
  createPhong,
  updatePhong,
  getPhongById,
  deletePhong,
  getPhongs,
  getPhongsByViTri,
  getPhongsPaginate,
  uploadHinhPhong,
} = require("../controllers/phong.controller");
const authenticated = require("../middlewares/authenticated");
const isAdmin = require("../middlewares/isAdmin");
const uploadCloud = require("../middlewares/uploader");

const phongRouter = Router();

phongRouter.get("", getPhongs());
phongRouter.get("/lay-phong-theo-vi-tri", getPhongsByViTri());
phongRouter.get("/phan-trang-tim-kiem", getPhongsPaginate());
phongRouter.get("/:id", getPhongById());

phongRouter.use(authenticated);
phongRouter.use(isAdmin);
phongRouter.post(
  "/upload-hinh-phong",
  uploadCloud.single("hinhAnh"),
  uploadHinhPhong()
);
phongRouter.post("/", uploadCloud.single("hinhAnh"), createPhong());
phongRouter.put("/:id", updatePhong());
phongRouter.delete("/:id", deletePhong());

module.exports = phongRouter;
