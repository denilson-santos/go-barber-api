import Redis, { Redis as RedisType } from 'ioredis';

import { ICacheProvider } from '../models/ICacheProvider';

import cacheConfig from '@config/cache';

export class RedisCacheProvider implements ICacheProvider {
  private client: RedisType;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save<T>(key: string, value: T): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | undefined> {
    const data = await this.client.get(key);

    if (!data) return undefined;

    const parsedData: T = JSON.parse(data);

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {}

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
