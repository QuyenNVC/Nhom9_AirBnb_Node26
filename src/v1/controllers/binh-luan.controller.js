const { AppError } = require("../middlewares/error");
const { response } = require("../middlewares/response");
const binhLuanService = require("../services/binh-luan.service");
const getAllBinhLuan = () => {
  return async (req, res, next) => {
    try {
      const comments = await binhLuanService.getAllBinhLuan();
      response(res, comments);
    } catch (error) {
      next(error);
    }
  };
};

const createBinhLuan = () => {
  return async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const { maPhong, saoBinhLuan } = req.body;
      if (maPhong === "") {
        throw new AppError(400, "Missing input maPhong");
      }
      if (saoBinhLuan < 0 || saoBinhLuan > 5) {
        throw new AppError(400, "SaoBinhLuan not more 5");
      }
      const create = await binhLuanService.createBinhLuan(id, req.body);
      response(res, create);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  };
};

const updateBinhLuan = () => {
  return async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const { idComment } = req.params;
      const { maPhong, saoBinhLuan } = req.body;
      if (maPhong === "") {
        throw new AppError(400, "Missing input maPhong");
      }
      if (saoBinhLuan < 0 || saoBinhLuan > 5) {
        throw new AppError(400, "SaoBinhLuan not more 5");
      }
      const update = await binhLuanService.updateBinhLuan(
        id,
        idComment,
        req.body
      );
      response(res, update);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  };
};

const deleteBinhLuan = () => {
  return async (req, res, next) => {
    try {
      const { idComment } = req.params;

      const deleteComment = await binhLuanService.deleteBinhLuan(idComment);
      response(res, deleteComment);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

const getAllBinhLuanTheoPhong = () => {
  return async (req, res, next) => {
    try {
      const { maPhong } = req.params;
      const comments = await binhLuanService.getAllBinhLuanTheoPhong(maPhong);
      response(res, comments);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};
module.exports = {
  getAllBinhLuan,
  createBinhLuan,
  updateBinhLuan,
  deleteBinhLuan,
  getAllBinhLuanTheoPhong,
};
