const redis = require('redis');
const {RateLimiterRedis} = require('rate-limiter-flexible');

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: client,
  keyPrefix: 'rateLimiter',
  points: 3,
  duration: 10,
});

module.exports = async (req, res, next) => {
  try {
    await limiter.consume(req.ip);

    return next();
  } catch (error) {
    return res.status(429)
      .json({error: 'Você está indo rápido demais...'});
  }
};
