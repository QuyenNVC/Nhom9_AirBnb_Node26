const { response } = require("../middlewares/response");
const { signUp } = require("../services/auth.service");

module.exports = {
  signUp: () => {
    return async (req, res, next) => {
      try {
        const result = await signUp(req.body);
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
};
