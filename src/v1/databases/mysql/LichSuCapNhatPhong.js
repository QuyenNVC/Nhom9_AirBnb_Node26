const { INTEGER, STRING, BOOLEAN, DATE, literal } = require("sequelize");
const sequelize = require("./connectDB");

module.exports = sequelize.define(
  "LichSuCapNhatPhong",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phongId: {
      type: INTEGER,
      allowNull: false,
      field: "phong_id",
    },
    khach: {
      type: INTEGER,
      defaultValue: 0,
    },

    phongNgu: {
      type: INTEGER,
      field: "phong_ngu",
      defaultValue: 0,
    },
    giuong: {
      type: INTEGER,
      defaultValue: 0,
    },
    phongTam: {
      type: INTEGER,
      field: "phong_tam",
      defaultValue: 0,
    },
    moTa: {
      type: STRING,
      field: "mo_ta",
    },
    giaTien: {
      type: INTEGER,
      field: "gia_tien",
      allowNull: false,
      defaultValue: 0,
    },
    mayGiat: {
      type: BOOLEAN,
      field: "may_giat",
      defaultValue: false,
    },
    banLa: {
      type: BOOLEAN,
      field: "ban_la",
      defaultValue: false,
    },
    tivi: {
      type: BOOLEAN,
      defaultValue: false,
    },
    dieuHoa: {
      type: BOOLEAN,
      field: "dieuHoa",
      defaultValue: false,
    },
    wifi: {
      type: BOOLEAN,
      defaultValue: false,
    },
    bep: {
      type: BOOLEAN,
      defaultValue: false,
    },
    doXe: {
      type: BOOLEAN,
      field: "do_xe",
      defaultValue: false,
    },
    hoBoi: {
      type: BOOLEAN,
      field: "ho_boi",
      defaultValue: false,
    },
    createdAt: {
      field: "created_at",
      type: DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "LichSuCapNhatPhong",
    createdAt: "createdAt",
    updatedAt: false,
    defaultScope: {
      attributes: {
        exclude: ["id", "createdAt"],
      },
    },
  }
);
