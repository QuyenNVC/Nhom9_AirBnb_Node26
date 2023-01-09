const { logger } = require("../helpers/logger");

class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const handleError = (err, req, res, next) => {
  if (!(err instanceof AppError)) {
    logger.error(err.stack);
    err = new AppError(500, "Something went wrong!");
  }

  res.status(err.status).json({
    status: "error",
    message: err.message,
  });

  next();
};

module.exports = {
  AppError,
  handleError,
};
