const sequelize = require("./connectDB");
const DatPhong = require("./DatPhong");
const User = require("./User");
const Phong = require("./Phong");
const ViTri = require("./ViTri");
const BinhLuan = require("./BinhLuan");
const LichSuCapNhatPhong = require("./LichSuCapNhatPhong");

User.hasMany(Phong, {
  as: "phongs",
  foreignKey: "userId",
});
Phong.belongsTo(User, {
  as: "owner",
  foreignKey: "userId",
});

ViTri.hasMany(Phong, {
  as: "phongs",
  foreignKey: "maViTri",
});
Phong.belongsTo(ViTri, {
  as: "viTri",
  foreignKey: "maViTri",
});

User.hasMany(DatPhong, {
  as: "datPhongs",
  foreignKey: "maNguoiDat",
});
DatPhong.belongsTo(User, {
  as: "nguoiDat",
  foreignKey: "maNguoiDat",
});

Phong.hasMany(DatPhong, {
  as: "orders",
  foreignKey: "maPhong",
});
DatPhong.belongsTo(Phong, {
  as: "phong",
  foreignKey: "maPhong",
});

User.hasMany(BinhLuan, {
  as: "binhLuans",
  foreignKey: "maNguoiBinhLuan",
});
BinhLuan.belongsTo(User, {
  as: "commentor",
  foreignKey: "maNguoiBinhLuan",
});

Phong.hasMany(BinhLuan, {
  as: "binhLuans",
  foreignKey: "maPhong",
});
BinhLuan.belongsTo(Phong, {
  as: "phong",
  foreignKey: "maPhong",
});

// Làm table lịch sử cập nhật phòng để giải quyết việc thông tin đặt phòng bị thay đổi khi thông tin phòng thay đổi
Phong.hasMany(LichSuCapNhatPhong, {
  as: "details",
  foreignKey: "phongId",
});
LichSuCapNhatPhong.belongsTo(Phong, {
  as: "phong",
  foreignKey: "phongId",
});

sequelize.sync({
  alter: true,
});

module.exports = sequelize;
