const { INTEGER, DATE, literal, STRING } = require("sequelize");
const sequelize = require("./connectDB");

module.exports = sequelize.define(
  "BinhLuan",
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
    maNguoiBinhLuan: {
      type: INTEGER,
      field: "ma_nguoi_binh_luan",
      allowNull: false,
    },
    ngayBinhLuan: {
      type: DATE,
      allowNull: false,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
    noiDung: {
      type: STRING,
      field: "noi_dung",
      allowNull: false,
    },
    saoBinhLuan: {
      type: INTEGER,
      field: "sao_binh_luan",
      allowNull: false,
    },
  },
  {
    tableName: "BinhLuan",
    timestamps: false,
  }
);
