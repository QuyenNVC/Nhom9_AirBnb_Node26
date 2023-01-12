require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { cronDeleteUnverifyAccounts } = require("./v1/helpers/cron");
const { logger } = require("./v1/helpers/logger");
const { accessLogStream } = require("./v1/helpers/logger");
const { handleError } = require("./v1/middlewares/error");
const rateLimiter = require("./v1/middlewares/rateLimiter");
const requestTrimmer = require("./v1/middlewares/requestTrimmer");

require("./v1/databases/mysql");

const app = express();
const { PORT } = process.env;

app.use(rateLimiter);
app.use(helmet());
app.use(
  morgan("combined", {
    stream: accessLogStream,
  })
);
app.use(compression());
app.use(express.json());
app.use(requestTrimmer);
app.use(express.static("statics"));

app.use("/api/v1", require("./v1/routes/index"));

app.use(handleError);

app.listen(PORT, () => logger.info(`Server listening on port ${PORT}!`));

cronDeleteUnverifyAccounts.start();

process.on("SIGINT", () => {
  logger.info("Server shutting down!");
  server.close();
});
