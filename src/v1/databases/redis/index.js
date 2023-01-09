const { createClient } = require("redis");
const { logger } = require("../../helpers/logger");

const client = createClient({
  url: process.env.REDIS_URL,
});
(async () => {
  await client.connect();
})();

client.on("connect", () => {
  logger.info("Redis client connected!");
});

client.on("error", (error) => {
  logger.error(error.stack);
});

module.exports = client;
