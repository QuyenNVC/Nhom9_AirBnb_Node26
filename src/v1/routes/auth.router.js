const express = require("express");
const { signUp } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/sign-up", signUp());

module.exports = authRouter;
