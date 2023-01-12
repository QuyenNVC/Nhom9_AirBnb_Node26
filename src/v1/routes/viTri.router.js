const { Router } = require("express");
const {
  createViTri,
  uploadHinhViTri,
  getViTriById,
  deleteViTri,
  updateViTri,
  getViTris,
  getViTrisPaginate,
} = require("../controllers/viTri.controller");
const authenticated = require("../middlewares/authenticated");
const isAdmin = require("../middlewares/isAdmin");
const uploadCloud = require("../middlewares/uploader");

const viTriRouter = Router();
viTriRouter.get("/", getViTris());
viTriRouter.get("/phan-trang-tim-kiem", getViTrisPaginate());
viTriRouter.get("/:id", getViTriById());

viTriRouter.use(authenticated);
viTriRouter.use(isAdmin);
viTriRouter.post("/", uploadCloud.single("hinhAnh"), createViTri());
viTriRouter.put("/:id", updateViTri());
viTriRouter.delete("/:id", deleteViTri());
viTriRouter.post(
  "/upload-hinh-vitri",
  uploadCloud.single("formFile"),
  uploadHinhViTri()
);

module.exports = viTriRouter;
