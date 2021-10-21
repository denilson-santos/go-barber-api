import { ICacheProvider } from '../models/ICacheProvider';

type CacheClient = {
  [key: string]: string;
};

export class FakeCacheProvider implements ICacheProvider {
  private client: CacheClient = {};

  public async save<T>(key: string, value: T): Promise<void> {
    this.client[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | undefined> {
    const data = this.client[key];

    if (!data) return undefined;

    const parsedData: T = JSON.parse(data);

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.client[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.client).filter((key) =>
      key.startsWith(`${prefix}:*`)
    );

    keys.forEach((key) => {
      delete this.client[key];
    });
  }
}
