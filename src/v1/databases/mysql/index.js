const sequelize = require("./connectDB");
const User = require("./user");

sequelize.sync({
  alter: true,
});

module.exports = sequelize;
