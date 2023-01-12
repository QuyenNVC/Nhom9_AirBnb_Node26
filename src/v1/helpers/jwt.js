const { verify, sign } = require("jsonwebtoken");
const { AppError } = require("../middlewares/error");
const { redisGet } = require("../services/redis");
const { TOKEN_TYPE, TOKEN } = require("./constants");

const generateToken = (payload) => {
  const token = sign(
    {
      id: payload.id,
      email: payload.email,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: parseInt(process.env.ACCESS_TOKEN_TIME),
    }
  );

  return {
    token,
    expiresIn: parseInt(process.env.ACCESS_TOKEN_TIME),
  };
};

checkToken = async (token, type) => {
  try {
    // if (await redisGet(`bl_${token}`)) {
    //   throw new AppError(401, "Invalid token!");
    // }

    const payload = verify(token, process.env.ACCESS_TOKEN_KEY);
    return payload;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateToken,
  checkToken,
};
