const { INTEGER, STRING } = require("sequelize");
const sequelize = require("./connectDB");

module.exports = sequelize.define(
  "ViTri",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tenViTri: {
      field: "ten_vi_tri",
      type: STRING,
      allowNull: false,
      unique: "name",
    },
    tinhThanh: {
      field: "tinh_thanh",
      allowNull: false,
      type: STRING,
    },
    quocGia: {
      field: "quoc_gia",
      type: STRING,
      allowNull: false,
    },
    hinhAnh: {
      field: "hinh_anh",
      type: STRING,
    },
    filename: {
      type: STRING,
    },
  },
  {
    tableName: "ViTri",
    timestamps: false,
  }
);
