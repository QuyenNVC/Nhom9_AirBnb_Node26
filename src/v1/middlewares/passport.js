const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOLE_CLIENT_ID,
      clientSecret: process.env.GOOLE_CLIENT_SECRET,
      callbackURL: process.env.GOOLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ["email", "profile"],
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["emails", "name"],
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

module.exports = passport;
