const { Op, DatabaseError } = require("sequelize");
const User = require("../databases/mysql/User");
const { ROLE } = require("../helpers/constants");
const { AppError } = require("../middlewares/error");
const cloudinary = require("cloudinary").v2;
const getAllUser = async () => {
  try {
    const users = await User.findAll({ raw: true });

    return users;
  } catch (error) {
    throw error;
  }
};

const getUserPagination = async ({ page, pageSize, name, ...query }) => {
  try {
    const queries = { raw: true };
    const offset = !page || +page <= 1 ? 0 : +page - 1;
    const limit = +pageSize || 8;

    queries.offset = offset;
    queries.limit = limit;

    if (name) {
      query.name = { [Op.substring]: name };
    }

    const users = await User.findAndCountAll({
      where: query,
      ...queries,
    });

    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new AppError(400, "User not existed");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByName = async (name) => {
  try {
    const user = await User.findAll({
      where: { name: { [Op.substring]: name } },
    });

    if (!user) {
      throw new AppError(400, "User not existed");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (data) => {
  try {
    const user = await User.findOrCreate({
      where: { email: data.email },
      defaults: {
        ...data,
        verifiedAt: Date.now(),
      },
    });

    if (!user[1]) {
      throw new AppError(400, "Email is existed");
    }
    return user[0];
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new AppError(400, "User is not existed");
    }

    const deleteUser = await User.destroy({ where: { id } });
    return `${deleteUser} user delete success`;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new AppError(400, "User is not existed");
    }
    if (data.email) {
      const isCheckEmail = await User.findOne({ where: { email: data.email } });
      if (data.email === isCheckEmail) {
        throw new AppError(400, "Email is existed");
      }
    }
    const updateUser = await User.update(data, { where: { id } });
    return `userId-${user.id} update success`;
  } catch (error) {
    throw error;
  }
};

const uploadAvatar = async (userID, fileData) => {
  try {
    console.log({ userID, fileData });
    const user = await User.findOne({ where: { id: userID } });
    if (!user && fileData) {
      cloudinary.uploader.destroy(fileData.filename);
      throw new AppError(400, "User is not existed");
    }
    if (fileData) {
      cloudinary.uploader.destroy(user.fileName);
    }
    const updateUser = await User.update(
      { avatar: fileData.path, fileName: fileData.filename },
      { where: { id: userID } }
    );
    return updateUser;
  } catch (error) {
    console.log("error", error);
    if (fileData) {
      cloudinary.uploader.destroy(fileData.filename);
    }
    throw error;
  }
};

module.exports = {
  getAllUser,
  createUser,
  deleteUser,
  getUserPagination,
  getUserById,
  getUserByName,
  updateUser,
  uploadAvatar,
};
