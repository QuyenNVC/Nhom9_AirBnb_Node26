const { INTEGER, STRING, DATE } = require("sequelize");
const sequelize = require("./connectDB");

module.exports = sequelize.define(
  "DatPhong",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    maPhong: {
      type: INTEGER,
      field: "ma_phong",
      allowNull: false,
    },
    ngayDen: {
      type: DATE,
      field: "ngay_den",
      allowNull: false,
    },
    ngayDi: {
      type: DATE,
      field: "ngay_di",
    },
    soLuongKhach: {
      field: "so_luong_khach",
      type: INTEGER,
      allowNull: false,
    },
    maNguoiDat: {
      field: "ma_nguoi_dat",
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "DatPhong",
  }
);
