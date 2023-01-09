const { rateLimit } = require("express-rate-limit");
const { AppError } = require("./error");

module.exports = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.RATE_LIMIT,
  handler: function (req, res, next) {
    next(new AppError(429, "Too many requests!"));
  },
  skip: (req, res) => {
    return req.ip === "::ffff:127.0.0.1";
  },
});
