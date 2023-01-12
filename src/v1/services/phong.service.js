const { Op } = require("sequelize");
const Phong = require("../databases/mysql/Phong");
const { getThongTinPhong } = require("../helpers/phongFunctions");
const { isViTriExist, isPhongExist } = require("../helpers/validators");
const { AppError } = require("../middlewares/error");

module.exports = {
  getPhongs: async () => {
    try {
      const result = await Phong.findAll({
        raw: true,
      }).then(async (result) => {
        return Promise.all(
          result.map(async (item) => {
            return await getThongTinPhong(item.id);
          })
        );
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPhongsByViTri: async (maViTri) => {
    try {
      if (!maViTri) {
        throw new AppError(400, "Bad request!");
      }

      await isViTriExist(maViTri);

      const result = await Phong.findAll({
        where: {
          maViTri,
        },
        raw: true,
      }).then(async (result) => {
        return Promise.all(
          result.map(async (item) => {
            return await getThongTinPhong(item.id);
          })
        );
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPhongsPaginate: async ({ page, pageSize, keyword }) => {
    try {
      keyword = keyword ? `%${keyword}%` : "";
      const condition = keyword
        ? {
            tenPhong: {
              [Op.like]: keyword,
            },
          }
        : {};
      const total = await Phong.count({
        where: condition,
      });
      const data = await Phong.findAll({
        where: condition,
        limit: isNaN(pageSize) ? 10 : parseInt(pageSize),
        offset:
          isNaN(pageSize) || isNaN(page) ? 0 : parseInt((page - 1) * pageSize),
        raw: true,
      }).then(async (result) => {
        return Promise.all(
          result.map(async (item) => {
            return await getThongTinPhong(item.id);
          })
        );
      });
      return {
        data,
        pagination: {
          total,
          page: page || 1,
          pageSize: pageSize || 10,
        },
      };
    } catch (error) {
      throw error;
    }
  },
  getPhongById: async (phongId) => {
    try {
      await isPhongExist(phongId);
      return await getThongTinPhong(phongId);
    } catch (error) {
      throw error;
    }
  },
  createPhong: async (data, file, requester) => {
    let createdPhongId = null;
    try {
      const { tenPhong, khach, maViTri } = data;
      if (!tenPhong || !khach || !maViTri) {
        throw new AppError(400, "Missing data!");
      }
      await isViTriExist(maViTri);

      const phong = await Phong.findOne({
        where: {
          tenPhong,
          maViTri,
        },
      });

      if (phong) {
        throw new AppError(400, "Phòng exists!");
      }

      const createdPhong = await Phong.create({
        tenPhong,
        maViTri,
        userId: requester.id,
        hinhAnh: file ? file.path : null,
        filename: file ? file.filename : null,
      });
      createdPhongId = createdPhong.id;
      await createdPhong.createDetail(data);
      return await getThongTinPhong(createdPhong.id);
    } catch (error) {
      if (error.name == "SequelizeDatabaseError") {
        error = new AppError(400, "Bad request!");
        await Phong.destroy({
          where: {
            id: createdPhongId,
          },
          force: true,
        });
      }
      throw error;
    }
  },
  updatePhong: async (data, phongId, requester) => {
    try {
      const { tenPhong, maViTri } = data;

      const phong = await isPhongExist(phongId);

      if (phong.userId != requester.id) {
        throw new AppError(403, "Unauthorized");
      }

      if (maViTri) {
        await isViTriExist(maViTri);
      }

      // Kiểm tra xem tên phòng này đã tồn tại ở các phòng khác hay chưa
      if (tenPhong) {
        if (
          await Phong.findOne({
            where: {
              tenPhong,
              maViTri: maViTri || phong.maViTri,
              id: {
                [Op.ne]: phongId,
              },
            },
          })
        ) {
          throw new AppError(400, "Phòng exists!");
        }
      }

      await Phong.update(data, {
        where: {
          id: phongId,
        },
      });

      const thongTinPhong = await getThongTinPhong(phong.id);
      await phong.createDetail({
        ...thongTinPhong.details[0].dataValues,
        ...data,
      });
      return await getThongTinPhong(phong.id);
    } catch (error) {
      if (error.name == "SequelizeDatabaseError") {
        error = new AppError(400, "Bad request!");
      }
      throw error;
    }
  },
  deletePhong: async (phongId, requester) => {
    try {
      const phong = await isPhongExist(phongId);
      if (phong.userId != requester.id) {
        throw new AppError(403, "Unauthorized");
      }
      await phong.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  },
  uploadHinhPhong: async (phongId, file, requester) => {
    try {
      if (!file) {
        throw new AppError(400, "Missing image");
      }
      const phong = await isPhongExist(phongId);
      if (phong.userId != requester.id) {
        throw new AppError(403, "Unauthorized");
      }
      await Phong.update(
        {
          filename: file.filename,
          hinhAnh: file.path,
        },
        {
          where: {
            id: phongId,
          },
        }
      );
      return await getThongTinPhong(phongId);
    } catch (error) {
      throw error;
    }
  },
};
