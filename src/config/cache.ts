import { RedisOptions } from 'ioredis';

type cacheType = {
  config: {
    redis: RedisOptions;
  };
};

export default {
  config: {
    redis: {
      host: 'db-redis',
      password: undefined,
      port: 6379,
    },
  },
} as cacheType;
