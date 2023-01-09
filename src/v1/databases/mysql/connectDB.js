const { Sequelize } = require("sequelize");
const { logger } = require("../../helpers/logger");

const sequelize = new Sequelize({
  dialect: "mysql",
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

sequelize
  .authenticate()
  .then(() => {
    logger.info("Connected with MySql!");
  })
  .catch((err) => {
    logger.error(err.stack);
    throw err;
  });

module.exports = sequelize;
