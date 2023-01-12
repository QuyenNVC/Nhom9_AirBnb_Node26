const { response } = require("../middlewares/response");
const {
  signUp,
  verifyAccount,
  signIn,
  loginSocialSuccess,
} = require("../services/auth.service");

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
  verifyAccount: () => {
    return async (req, res, next) => {
      try {
        const { code } = req.query;
        const result = await verifyAccount(code);
        response(res, result);
      } catch (error) {
        next(error);
      }
    };
  },
  signIn: () => {
    return async (req, res, next) => {
      try {
        const token = await signIn(req.body);
        response(res, token);
      } catch (error) {
        next(error);
      }
    };
  },
  loginGoogleSuccess: () => {
    return async (req, res, next) => {
      try {
        const data = {
          name: req.user.displayName,
          email: req.user.emails[0].value,
        };
        const token = await loginSocialSuccess(data);
        response(res, token);
      } catch (error) {
        next(error);
      }
    };
  },
  loginFacebookSuccess: () => {
    return async (req, res, next) => {
      try {
        const data = {
          name: req.user.name.givenName,
          email: req.user.emails[0].value,
        };
        const token = await loginSocialSuccess(data);
        response(res, token);
      } catch (error) {
        next(error);
      }
    };
  },
};
