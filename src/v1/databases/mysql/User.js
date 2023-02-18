const {
  STRING,
  BOOLEAN,
  ENUM,
  INTEGER,
  DATE,
  literal,
  NOW,
} = require("sequelize");
const { ROLE } = require("../../helpers/constants");
const sequelize = require("./connectDB");
const { genSaltSync, hashSync } = require("bcrypt");

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
      // allowNull: false,
    },
    birthDay: {
      type: DATE,
      // allowNull: false,
      field: "birth_day",
    },
    gender: {
      type: BOOLEAN,
      // allowNull: false,
    },
    role: {
      type: ENUM(ROLE.ADMIN, ROLE.USER),
      allowNull: false,
    },
    avatar: {
      type: STRING,
    },
    fileName: {
      type: STRING,
      field: "file_name",
    },
    createdAt: {
      type: DATE,
      field: "created_at",
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
    verifiedAt: {
      type: DATE,
      field: "verified_at",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    updatedAt: false,
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
