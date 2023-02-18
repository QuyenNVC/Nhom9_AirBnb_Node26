const DatPhong = require("../databases/mysql/DatPhong");
const Phong = require("../databases/mysql/Phong");
const User = require("../databases/mysql/User");
const { getThongTinPhong } = require("../helpers/phongFunctions");
const { AppError } = require("../middlewares/error");
const moment = require("moment");
const { ROLE } = require("../helpers/constants");
const { Op, Sequelize } = require("sequelize");
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

const getDatPhongById = async (id, requester) => {
  try {
    const result = await DatPhong.findAll({
      raw: true,
      where:
        requester.role == ROLE.ADMIN
          ? { id }
          : { id, maNguoiDat: requester.id },
    });

    if (result.length === 0) {
      throw new AppError(400, "DatPhong is not existed");
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

const getDatPhongByNguoiDung = async (userId, requester) => {
  try {
    if (userId != requester.id && requester.role != ROLE.ADMIN) {
      throw new AppError(403, "Unauthorized!");
    }

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

    const datPhong = await DatPhong.findOne({
      where: {
        maPhong: data.maPhong,
        [Op.or]: [
          {
            [Op.or]: [
              {
                ngayDen: {
                  [Op.gte]: new Date(data.ngayDen),
                  [Op.lt]: new Date(data.ngayDi),
                },
              },
              {
                ngayDi: {
                  [Op.gt]: new Date(data.ngayDen),
                  [Op.lte]: new Date(data.ngayDi),
                },
              },
            ],
          },
          {
            ngayDen: {
              [Op.lte]: new Date(data.ngayDen),
            },
            ngayDi: {
              [Op.gte]: new Date(data.ngayDi),
            },
          },
        ],
      },
    });

    if (datPhong) {
      throw new AppError(400, "Phong already ordered!");
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

    const datPhong2 = await DatPhong.findOne({
      where: {
        id: {
          [Op.ne]: data.maDatPhong,
        },
        maPhong: data.maPhong,
        [Op.or]: [
          {
            [Op.or]: [
              {
                ngayDen: {
                  [Op.gte]: new Date(data.ngayDen),
                  [Op.lt]: new Date(data.ngayDi),
                },
              },
              {
                ngayDi: {
                  [Op.gt]: new Date(data.ngayDen),
                  [Op.lte]: new Date(data.ngayDi),
                },
              },
            ],
          },
          {
            ngayDen: {
              [Op.lte]: new Date(data.ngayDen),
            },
            ngayDi: {
              [Op.gte]: new Date(data.ngayDi),
            },
          },
        ],
      },
    });

    if (datPhong2) {
      throw new AppError(400, "Phong already ordered!");
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
