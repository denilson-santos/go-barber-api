import Redis from 'ioredis';

import { RateLimiterRedis } from 'rate-limiter-flexible';

import { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppErrors';
import cacheConfig from '@config/cache';

const redisClient = new Redis(cacheConfig.config.redis);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

export async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    next();
  } catch (error) {
    throw new AppError('To many requests', 429);
  }
}
