const { INTEGER, STRING, BOOLEAN } = require("sequelize");
const sequelize = require("./connectDB");

module.exports = sequelize.define(
  "Phong",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tenPhong: {
      type: STRING,
      field: "ten_phong",
      allowNull: false,
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
    },
    mayGiat: {
      type: BOOLEAN,
      field: "may_giat",
    },
    banLa: {
      type: BOOLEAN,
      field: "ban_la",
    },
    tivi: {
      type: BOOLEAN,
    },
    dieuHoa: {
      type: BOOLEAN,
      field: "dieuHoa",
    },
    wifi: {
      type: BOOLEAN,
    },
    bep: {
      type: BOOLEAN,
    },
    doXe: {
      type: BOOLEAN,
      field: "do_xe",
    },
    hoBoi: {
      type: BOOLEAN,
      field: "ho_boi",
    },
    hinhAnh: {
      type: STRING,
      field: "hinh_anh",
    },
    idViTri: {
      field: "id_vi_tri",
      type: INTEGER,
      allowNull: false,
    },
    userId: {
      field: "user_id",
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Phong",
    timestamps: false,
  }
);
