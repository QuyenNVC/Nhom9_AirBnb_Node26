const { response } = require("../middlewares/response");
const {
  createViTri,
  getViTriById,
  uploadHinhViTri,
  deleteViTri,
  updateViTri,
  getViTris,
  getViTrisPaginate,
} = require("../services/viTri.service");

module.exports = {
  getViTris: () => {
    return async (req, res, next) => {
      try {
        const result = await getViTris();
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  getViTrisPaginate: () => {
    return async (req, res, next) => {
      try {
        const result = await getViTrisPaginate(req.query);
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  getViTriById: () => {
    return async (req, res, next) => {
      try {
        const viTri = await getViTriById(req.params.id);
        response(res, viTri);
      } catch (error) {
        next(error);
      }
    };
  },
  createViTri: () => {
    return async (req, res, next) => {
      try {
        const result = await createViTri(req.body, req.file);
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  updateViTri: () => {
    return async (req, res, next) => {
      try {
        const result = await updateViTri(req.body, req.params.id);
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  deleteViTri: () => {
    return async (req, res, next) => {
      try {
        const result = await deleteViTri(req.params.id);
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  uploadHinhViTri: () => {
    return async (req, res, next) => {
      try {
        const result = await uploadHinhViTri(req.query.maViTri, req.file);
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
};
