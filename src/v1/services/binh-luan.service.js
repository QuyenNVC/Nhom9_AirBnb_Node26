const BinhLuan = require("../databases/mysql/BinhLuan");
const User = require("../databases/mysql/User");
const Phong = require("../databases/mysql/Phong");
const { AppError } = require("../middlewares/error");
// const moment = require("moment-timezone");
const moment = require("moment");
// const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const tz = require("dayjs/plugin/timezone");
const getAllBinhLuan = async () => {
  try {
    const response = await BinhLuan.findAll();
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllBinhLuanTheoPhong = async (maPhong) => {
  try {
    const response = await BinhLuan.findAll({ where: { maPhong }, raw: true });
    return response;
  } catch (error) {
    throw error;
  }
};

const createBinhLuan = async (userId, data) => {
  try {
    // console.log(userId);
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new AppError(400, "User is not existed");
    }
    const phong = await Phong.findOne({ where: { id: data.maPhong } });
    if (!phong) {
      throw new AppError(400, "Phong is not existed");
    }
    // dayjs.extend(utc);
    // dayjs.extend(tz);
    // const timeZone = dayjs.tz.guess();
    // const utcTime = moment().utc().format("YYYY-MM-DD HH:mm:ss.SS");
    // const guessZone = moment.tz.guess();
    // console.log(guessZone);
    // console.log(moment.tz(Date.now(), "Asia/Ho_Chi_Minh"));
    // console.log(moment().format("YYYY-MM-DD HH:mm:ss.SS"));
    const timeZone = moment().format("YYYY-MM-DD HH:mm:ss").split(" ");
    // console.log(`${timeZone[0]}T${timeZone[1]}`);
    const createUser = await phong.createBinhLuan({
      ...data,
      // ngayBinhLuan: moment
      //   .utc(utcTime)
      //   .tz("Asia/Ho_Chi_Minh")
      //   .format("YYYY-MM-DD HH:mm:ss.SS"),
      ngayBinhLuan: `${timeZone[0]}T${timeZone[1]}`,
      maNguoiBinhLuan: userId,
    });
    // console.log("User, phong.__proto__);

    return createUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateBinhLuan = async (userId, idComment, data) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new AppError(400, "User is not existed");
    }
    const phong = await Phong.findOne({ where: { id: data.maPhong } });
    if (!phong) {
      throw new AppError(400, "Phong is not existed");
    }

    const comment = await BinhLuan.findOne({ where: { id: +idComment } });
    if (!comment) {
      throw new AppError(400, "Comment is not existed");
    }

    const updateComment = await comment.update(
      {
        ...data,
        ngayBinhLuan: Date.now(),
      },
      { where: { id: +idComment } }
    );

    return updateComment;
  } catch (error) {
    throw error;
  }
};

const deleteBinhLuan = async (idComment) => {
  try {
    const comment = await BinhLuan.findOne({ where: { id: +idComment } });
    if (!comment) {
      throw new AppError(400, "Comment is not existed");
    }

    const deleteComment = await comment.destroy({ where: { id: +idComment } });

    return deleteComment;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllBinhLuan,
  createBinhLuan,
  updateBinhLuan,
  deleteBinhLuan,
  getAllBinhLuanTheoPhong,
};
