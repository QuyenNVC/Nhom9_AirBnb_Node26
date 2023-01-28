const DatPhong = require("../databases/mysql/DatPhong");
const Phong = require("../databases/mysql/Phong");
const User = require("../databases/mysql/User");
const { getThongTinPhong } = require("../helpers/phongFunctions");
const { AppError } = require("../middlewares/error");
const moment = require("moment");
const getAllDatPhong = async () => {
  try {
    const result = await DatPhong.findAll({
      raw: true,
    });

    const detailPhong = await Promise.all(
      result.map(async (item) => {
        return {
          ...item,
          detailPhong: await getThongTinPhong(item.maPhong, item.createdAt),
        };
      })
    );

    return detailPhong;
  } catch (error) {
    throw error;
  }
};

const getDatPhongById = async (id) => {
  try {
    const result = await DatPhong.findAll({
      raw: true,
      where: { id },
    });

    if (result.length === 0) {
      throw new AppError(400, "DatPhong Id is not existed");
    }

    const detailPhong = await Promise.all(
      result.map(async (item) => {
        return {
          ...item,
          detailPhong: await getThongTinPhong(item.maPhong, item.createdAt),
        };
      })
    );

    return detailPhong;
  } catch (error) {
    throw error;
  }
};

const getDatPhongByNguoiDung = async (userId) => {
  try {
    const result = await DatPhong.findAll({
      raw: true,
      where: { maNguoiDat: userId },
    });

    if (result.length === 0) {
      throw new AppError(400, "maNguoiDat Id is not existed");
    }

    const detailPhong = await Promise.all(
      result.map(async (item) => {
        return {
          ...item,
          detailPhong: await getThongTinPhong(item.maPhong, item.createdAt),
        };
      })
    );

    return detailPhong;
  } catch (error) {
    throw error;
  }
};

const createDatPhong = async (data, userId) => {
  try {
    const phong = await Phong.findByPk(data.maPhong);
    if (!phong) {
      throw new AppError(400, "Phong id is not existed");
    }
    const getPhong = await getThongTinPhong(data.maPhong);
    const isCheckKhach = getPhong.dataValues.details[0].dataValues.khach;
    if (data.soLuongKhach > isCheckKhach) {
      throw new AppError(400, "SoLuongKhach is not more Khach of Phong");
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User id is not existed");
    }

    const createDatPhong = await DatPhong.create({
      ...data,
      maNguoiDat: userId,
    });
    return createDatPhong;
  } catch (error) {
    throw error;
  }
};

const updateDatPhong = async (data, userId, maDatPhong) => {
  try {
    console.log(data);
    if (data.maPhong) {
      const phong = await Phong.findByPk(data.maPhong);
      if (!phong) {
        throw new AppError(400, "Phong id is not existed");
      }
      if (data.soLuongKhach) {
        const getPhong = await getThongTinPhong(data.maPhong);
        const isCheckKhach = getPhong.dataValues.details[0].dataValues.khach;
        if (data.soLuongKhach > isCheckKhach) {
          throw new AppError(400, "SoLuongKhach is not more Khach of Phong");
        }
      }
    } else {
      throw new AppError(400, "Not find soLuongKhach");
    }

    if (data.maNguoiDat) {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new AppError(400, "User id is not existed");
      }
    }
    const datPhong = await DatPhong.findOne({ where: { id: maDatPhong } });

    const startData = moment(datPhong.dataValues.ngayDen, "DD/MM/YYYT");
    const endData = moment(datPhong.dataValues.ngayDi, "DD/MM/YYYY");

    if (data.ngayDen) {
      const start = moment(data.ngayDen, "DD/MM/YYYY");

      const isCheckNgayDen = start.isBefore(endData);
      if (!isCheckNgayDen) {
        throw new AppError(400, "NgayDen phải nhỏ hơn ngayDi ở Data");
      }
    }

    if (data.ngayDi) {
      const end = moment(data.ngayDi, "DD/MM/YYYY");

      const isCheckNgayDi = end.isAfter(startData);
      if (!isCheckNgayDi) {
        throw new AppError(400, "NgayDi phải lớn hơn ngayDen ở Data");
      }
    }
    const updateDatPhong = await DatPhong.update(
      {
        ...data,

        maNguoiDat: userId,
        updatedAt: Date.now(),
      },
      { where: { id: maDatPhong } }
    );
    return updateDatPhong;
  } catch (error) {
    throw error;
  }
};

const deleteDatPhong = async (idPhong) => {
  try {
    const deleteDatPhong = await DatPhong.destroy({ where: { id: idPhong } });
    return deleteDatPhong;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllDatPhong,
  createDatPhong,
  getDatPhongById,
  getDatPhongByNguoiDung,
  updateDatPhong,
  deleteDatPhong,
};
