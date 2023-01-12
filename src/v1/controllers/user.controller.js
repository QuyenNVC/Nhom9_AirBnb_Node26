const { isEmail } = require("../helpers/validators");
const { AppError } = require("../middlewares/error");
const { response } = require("../middlewares/response");
const userService = require("../services/user.service");

const getAllUser = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getAllUser();
      response(res, users);
    } catch (error) {
      next(error);
    }
  };
};

const getUserPagination = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUserPagination(req.query);
      response(res, users);
    } catch (error) {
      next(error);
    }
  };
};

const getUserById = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);
      response(res, user);
    } catch (error) {
      next(error);
    }
  };
};

const getUserByName = () => {
  return async (req, res, next) => {
    try {
      const { name } = req.params;
      if (!name) {
        throw new AppError(400, "Required input name");
      }
      const user = await userService.getUserByName(name);
      response(res, user);
    } catch (error) {
      next(error);
    }
  };
};

const createUser = () => {
  return async (req, res, next) => {
    try {
      const { email, password, name, role } = req.body;
      if (!email || !password || !name || !role) {
        throw new AppError(400, "Missing input");
      }
      if (!isEmail(email)) {
        throw new AppError(400, "Email invalid");
      }
      const user = await userService.createUser(req.body);
      response(res, user);
    } catch (error) {
      next(error);
    }
  };
};

const deleteUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.query;
      if (!id) {
        throw new AppError(400, "Id not empty");
      }
      const deleteUser = await userService.deleteUser(id);
      response(res, deleteUser);
    } catch (error) {
      next(error);
    }
  };
};

const updateUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new AppError(400, "Id not empty");
      }
      const updateUser = await userService.updateUser(id, req.body);
      response(res, updateUser);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getAllUser,
  deleteUser,
  createUser,
  getUserPagination,
  getUserById,
  getUserByName,
  updateUser,
};
