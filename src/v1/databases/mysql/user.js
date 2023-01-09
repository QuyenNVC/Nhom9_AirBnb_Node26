const { genSaltSync, hashSync } = require("bcrypt");
const { STRING, BOOLEAN, ENUM, INTEGER, DATE, literal } = require("sequelize");
const sequelize = require("./connectDB");

module.exports = sequelize.define(
  "User",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: "email",
      validate: {
        isEmail: {
          msg: "Invalid Email!",
        },
      },
    },
    password: {
      type: STRING,
      set(value) {
        const salt = genSaltSync();
        const hashedPassword = hashSync(value, salt);
        this.setDataValue("password", hashedPassword);
      },
    },
    phone: {
      type: STRING,
      allowNull: false,
    },
    birthDay: {
      type: DATE,
      allowNull: false,
      field: "birth_day",
    },
    gender: {
      type: BOOLEAN,
      allowNull: false,
    },
    role: {
      type: ENUM("ADMIN", "USER"),
      allowNull: false,
    },
    verifiedAt: {
      type: DATE,
      field: "verified_at",
    },
  },
  {
    tableName: "users",
    timestamps: false,
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    hooks: {
      afterSave: (record) => {
        delete record.dataValues.password;
      },
    },
  }
);
