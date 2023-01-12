const { Op } = require("sequelize");
const Phong = require("../databases/mysql/Phong");

module.exports = {
  getThongTinPhong: async (phongId, time = new Date()) => {
    try {
      const phong = await Phong.findByPk(phongId, {
        include: {
          association: "details",
          where: {
            createdAt: {
              [Op.lte]: time,
            },
          },
          order: [["createdAt", "DESC"]],
          limit: 1,
        },
      });
      return phong;
    } catch (error) {
      throw error;
    }
  },
};
