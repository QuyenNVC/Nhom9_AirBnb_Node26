const Phong = require("../databases/mysql/Phong");
const ViTri = require("../databases/mysql/ViTri");
const { AppError } = require("../middlewares/error");

module.exports = {
  isJson: (str) => {
    try {
      JSON.parse(str);
    } catch (error) {
      return false;
    }
    return true;
  },
  isEmail: (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  },
  isViTriExist: async (id) => {
    const viTri = await ViTri.findByPk(id);
    if (!viTri) {
      throw new AppError(404, "Vị trí not found!");
    }
    return viTri;
  },
  isPhongExist: async (id) => {
    const phong = await Phong.findByPk(id);
    if (!phong) {
      throw new AppError(404, "Phòng not found!");
    }
    return phong;
  },
};
