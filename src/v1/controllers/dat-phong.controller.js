const moment = require("moment");
const { AppError } = require("../middlewares/error");
const { response } = require("../middlewares/response");
const datPhongService = require("../services/dat-phong.service");
const getAllDatPhong = () => {
  return async (req, res, next) => {
    try {
      const datPhong = await datPhongService.getAllDatPhong();
      response(res, datPhong);
    } catch (error) {
      next(error);
    }
  };
};

const getDatPhongById = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const datPhong = await datPhongService.getDatPhongById(id);
      response(res, datPhong);
    } catch (error) {
      next(error);
    }
  };
};

const getDatPhongByNguoiDung = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      const datPhong = await datPhongService.getDatPhongByNguoiDung(userId);
      response(res, datPhong);
    } catch (error) {
      next(error);
    }
  };
};

const createKhach = () => {
  return async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const { ngayDen, ngayDi, maPhong, soLuongKhach } = req.body;

      if (!ngayDen || !ngayDi || !maPhong || !soLuongKhach) {
        throw new AppError(400, "Missing input");
      }
      const start = moment(ngayDen, "YYYY-MM-DD");
      const end = moment(ngayDi, "YYYY-MM-DD");

      const isCheckNgayDen = start.isBefore(end);
      if (!isCheckNgayDen) {
        throw new AppError(400, "NgayDen phải nhỏ hơn ngayDi");
      }

      const datPhong = await datPhongService.createDatPhong(req.body, id);
      response(res, datPhong);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

const updateKhach = () => {
  return async (req, res, next) => {
    try {
      const { ngayDen, ngayDi, maNguoiDat } = req.body;
      const { maDatPhong } = req.params;
      if (ngayDen && ngayDi) {
        const start = moment(ngayDen, "DD/MM/YYYY");
        const end = moment(ngayDi, "DD/MM/YYYY");

        const isCheckNgayDen = start.isBefore(end);
        if (!isCheckNgayDen) {
          throw new AppError(400, "NgayDen phải nhỏ hơn ngayDi");
        }
      }
      const datPhong = await datPhongService.updateDatPhong(
        req.body,
        maNguoiDat,
        maDatPhong
      );
      response(res, datPhong);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

const deleteDatPhong = () => {
  return async (req, res, next) => {
    try {
      const { maDatPhong } = req.params;

      const datPhong = await datPhongService.deleteDatPhong(maDatPhong);
      response(res, datPhong);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getAllDatPhong,
  createKhach,
  getDatPhongById,
  getDatPhongByNguoiDung,
  updateKhach,
  deleteDatPhong,
};
