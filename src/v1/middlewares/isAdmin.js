const { ROLE } = require("../helpers/constants");
const { AppError } = require("./error");

module.exports = (req, res, next) => {
  if (res.locals.user.role == ROLE.ADMIN) {
    next();
  } else {
    throw new AppError(403, "Unauthorized!");
  }
};
