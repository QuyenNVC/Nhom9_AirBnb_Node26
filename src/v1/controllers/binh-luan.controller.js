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
module.exports = {
  getAllBinhLuan,
};
