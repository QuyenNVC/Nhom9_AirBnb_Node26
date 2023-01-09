const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");
const User = require("../databases/mysql/user");
const { TOKEN_TYPE } = require("../helpers/constants");
const { checkToken } = require("../helpers/jwt");
const { AppError } = require("./error");

const extractTokenFromHeader = (header) => {
  const bearerToken = header.authorization;
  if (!bearerToken) {
    throw new AppError(401, "Invalid token!");
  }

  const parts = bearerToken.trim().split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new AppError(401, "Invalid Token");
  }

  return parts[1];
};

const authenticated = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers);
    const payload = await checkToken(token, TOKEN_TYPE.access);

    const user = await user.findById(payload.id);
    if (!user) {
      throw new AppError(401, "Invalid Token");
    }

    res.locals.user = user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new AppError(401, "Expired token"));
    }
    if (error instanceof JsonWebTokenError) {
      error = new AppError(401, "Invalid token");
    }
    next(error);
  }
};

module.exports = authenticated;
