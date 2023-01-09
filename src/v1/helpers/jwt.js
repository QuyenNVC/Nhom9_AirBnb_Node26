const { verify } = require("jsonwebtoken");
const { AppError } = require("../middlewares/error");
const { redisGet } = require("../services/redis");
const { TOKEN_TYPE, TOKEN } = require("./constants");

const generateToken = (payload, type) => {
  if (!(type == TOKEN_TYPE.refresh || type == TOKEN_TYPE.access)) {
    throw new AppError(500, "Something went wrong!");
  }

  const token = sign(
    {
      id: payload.id,
      email: payload.email,
    },
    TOKEN[type].key,
    {
      expiresIn: TOKEN[type].expiresIn,
    }
  );

  return {
    token,
    expiresIn: TOKEN_CFG[type].expiresIn,
  };
};

checkToken = async (token, type) => {
  try {
    // if (await redisGet(`bl_${token}`)) {
    //   throw new AppError(401, "Invalid token!");
    // }

    const payload = verify(token, TOKEN[type].key);
    return payload;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateToken,
  checkToken,
};
