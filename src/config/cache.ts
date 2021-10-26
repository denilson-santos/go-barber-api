import { RedisOptions } from 'ioredis';

type cacheType = {
  config: {
    redis: RedisOptions;
  };
};

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASS,
      port: process.env.REDIS_PORT || undefined,
    },
  },
} as cacheType;
