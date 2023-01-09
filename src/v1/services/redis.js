const client = require("../databases/redis");
const { isJson } = require("../helpers/validators");

module.exports = {
  redisGet: async (key) => {
    const result = await client.get(key);
    return isJson(result) ? JSON.parse(result) : result;
  },
  redisSet: async (key, value, timeExpires = null) => {
    if (timeExpires) {
      await client.setEx(key, timeExpires, JSON.stringify(value));
    } else {
      await client.setNX(key, JSON.stringify(value));
    }
  },
};
