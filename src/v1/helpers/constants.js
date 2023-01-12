module.exports = {
  TOKEN_TYPE: {
    access: "access",
    refresh: "refresh",
  },
  TOKEN: {
    access: {
      key: process.env.ACCESS_TOKEN_KEY,
      time: process.env.ACCESS_TOKEN_TIME,
    },
    refresh: {
      key: process.env.REFRESH_TOKEN_KEY,
      time: process.env.REFRESH_TOKEN_TIME,
    },
  },
  ROLE: {
    USER: "USER",
    ADMIN: "ADMIN",
  },
};
