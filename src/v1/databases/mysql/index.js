const sequelize = require("./connectDB");
const DatPhong = require("./DatPhong");
const Phong = require("./Phong");
const User = require("./User");
const ViTri = require("./ViTri");
const BinhLuan = require("./BinhLuan");

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
  foreignKey: "idViTri",
});
Phong.belongsTo(ViTri, {
  as: "viTri",
  foreignKey: "idViTri",
});

// User.belongsToMany(Phong, {
//   as: "phongDats",
//   through: DatPhong,
//   foreignKey: "maNguoiDat",
// });
// Phong.belongsToMany(User, {
//   as: "phongDats",
//   through: DatPhong,
//   foreignKey: "maPhong",
// });

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

sequelize.sync({
  alter: true,
});

module.exports = sequelize;
