const { response } = require("../middlewares/response");
const {
  createPhong,
  updatePhong,
  getPhongById,
  deletePhong,
  getPhongs,
  getPhongsByViTri,
  getPhongsPaginate,
  uploadHinhPhong,
} = require("../services/phong.service");

module.exports = {
  getPhongs: () => {
    return async (req, res, next) => {
      try {
        const result = await getPhongs();
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  getPhongsByViTri: () => {
    return async (req, res, next) => {
      try {
        const result = await getPhongsByViTri(req.query.maViTri);
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  getPhongsPaginate: () => {
    return async (req, res, next) => {
      try {
        const result = await getPhongsPaginate(req.query);
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  getPhongById: () => {
    return async (req, res, next) => {
      try {
        const result = await getPhongById(req.params.id);
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  createPhong: () => {
    return async (req, res, next) => {
      try {
        const result = await createPhong(req.body, req.file, res.locals.user);
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  updatePhong: () => {
    return async (req, res, next) => {
      try {
        const result = await updatePhong(
          req.body,
          req.params.id,
          res.locals.user
        );
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  deletePhong: () => {
    return async (req, res, next) => {
      try {
        const result = await deletePhong(req.params.id, res.locals.user);
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  uploadHinhPhong: () => {
    return async (req, res, next) => {
      try {
        const result = await uploadHinhPhong(
          req.query.maPhong,
          req.file,
          res.locals.user
        );
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
};
