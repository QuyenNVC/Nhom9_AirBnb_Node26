const epxress = require("express");
const routerUser = epxress.Router();
const userController = require("../controllers/user.controller");
const authenticated = require("../middlewares/authenticated");
const isAdmin = require("../middlewares/isAdmin");

routerUser.get("/", userController.getAllUser());
routerUser.get("/:id", userController.getUserById());
routerUser.get("/search/:name", userController.getUserByName());
routerUser.get("/phan-trang-tim-kiem", userController.getUserPagination());
routerUser.use(authenticated);
routerUser.use(isAdmin);
routerUser.put("/:id", userController.updateUser());
routerUser.post("/", userController.createUser());
routerUser.delete("/", userController.deleteUser());
module.exports = routerUser;