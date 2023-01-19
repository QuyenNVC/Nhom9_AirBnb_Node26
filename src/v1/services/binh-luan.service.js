const BinhLuan = require("../databases/mysql/BinhLuan");

const getAllBinhLuan = async () => {
  try {
    const response = await BinhLuan.findAll();
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllBinhLuan,
};
