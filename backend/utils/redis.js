const { createClient } = require("redis");

const REDIS_EXPIRATION = process.env.REDIS_EXPIRATION || 120

let redisClient;
(async () => {
  redisClient = createClient();

redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect();
})();

const getOrSet = async (key, callback) => {
  const redisVal = await redisClient.GET(key);
  if (redisVal != null) return JSON.parse(redisVal);

  const val = await callback();
  await redisClient.SETEX(key, REDIS_EXPIRATION, JSON.stringify(val));
  return val
}

module.exports = {
  getOrSet,
  redisClient
}