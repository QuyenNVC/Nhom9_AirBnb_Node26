const cookieSession = require("cookie-session");
const express = require("express");
const {
  signUp,
  verifyAccount,
  signIn,
  loginGoogleSuccess,
  loginFacebookSuccess,
} = require("../controllers/auth.controller");
const { AppError } = require("../middlewares/error");
const passport = require("../middlewares/passport");

const authRouter = express.Router();

authRouter.get("/verify", verifyAccount());
authRouter.post("/register", signUp());
authRouter.post("/login", signIn());

authRouter.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
authRouter.use(passport.initialize());
authRouter.use(passport.session());
authRouter.get("/login-google", passport.authenticate("google"));
authRouter.get(
  "/google-redirect",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/auth/login-failed",
  }),
  function (req, res) {
    res.redirect("/api/v1/auth/login-google-success");
  }
);
authRouter.get("/login-google-success", loginGoogleSuccess());

authRouter.get(
  "/login-facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
authRouter.get(
  "/facebook-redirect",
  passport.authenticate("facebook", {
    failureRedirect: "/api/v1/auth/login-failed",
  }),
  function (req, res) {
    res.redirect("/api/v1/auth/login-facebook-success");
  }
);
authRouter.get("/login-facebook-success", loginFacebookSuccess());
authRouter.get("/login-failed", (req, res) => {
  throw new AppError(401, "Login failed");
});

module.exports = authRouter;
