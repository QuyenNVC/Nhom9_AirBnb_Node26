const { Op } = require("sequelize");
const ViTri = require("../databases/mysql/ViTri");
const { isViTriExist } = require("../helpers/validators");
const { AppError } = require("../middlewares/error");

module.exports = {
  getViTris: async () => {
    try {
      const result = await ViTri.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  },
  getViTrisPaginate: async ({ page, pageSize, keyword }) => {
    try {
      keyword = keyword ? `%${keyword}%` : "";
      const condition = keyword
        ? {
            [Op.or]: {
              tenViTri: {
                [Op.like]: keyword,
              },
              tinhThanh: {
                [Op.like]: keyword,
              },
              quocGia: {
                [Op.like]: keyword,
              },
            },
          }
        : {};
      const total = await ViTri.count({
        where: condition,
      });
      const data = await ViTri.findAll({
        where: condition,
        limit: isNaN(pageSize) ? 10 : parseInt(pageSize),
        offset:
          isNaN(pageSize) || isNaN(page) ? 0 : parseInt((page - 1) * pageSize),
      });
      return {
        data,
        paginattion: {
          total,
          page: page || 1,
          pageSize: pageSize || 10,
        },
      };
    } catch (error) {
      throw error;
    }
  },
  getViTriById: async (id) => {
    try {
      return await isViTriExist(id);
    } catch (error) {
      throw error;
    }
  },
  createViTri: async (data, file) => {
    try {
      const { tenViTri, tinhThanh, quocGia } = data;
      if (!tenViTri || !tinhThanh || !quocGia) {
        throw new AppError(400, "Bad request!");
      }

      const vitri = await ViTri.findOne({
        where: {
          tenViTri,
        },
      });

      if (vitri) {
        throw new AppError(400, "tenViTri exists!");
      }

      const vitriCreated = await ViTri.create({
        ...data,
        hinhAnh: file ? file.path : null,
        filename: file ? file.filename : null,
      });
      return vitriCreated;
    } catch (error) {
      throw error;
    }
  },
  updateViTri: async (data, id) => {
    try {
      await isViTriExist(id);
      await ViTri.update(data, {
        where: {
          id,
        },
      });
      const viTri = await isViTriExist(id);
      return viTri;
    } catch (error) {
      throw error;
    }
  },
  deleteViTri: async (id) => {
    try {
      const viTri = await isViTriExist(id);
      await viTri.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  },
  uploadHinhViTri: async (maViTri, file) => {
    try {
      const viTri = await isViTriExist(maViTri);
      if (!file) {
        throw new AppError("Missing image!");
      }

      await viTri.update({
        hinhAnh: file.path,
        filename: file.filename,
      });

      return viTri;
    } catch (error) {
      throw error;
    }
  },
};
