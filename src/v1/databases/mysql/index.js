const sequelize = require("./connectDB");
const User = require("./User");

sequelize.sync({
  alter: true,
});

module.exports = sequelize;
