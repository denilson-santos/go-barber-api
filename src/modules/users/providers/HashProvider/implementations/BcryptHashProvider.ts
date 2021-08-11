import { compare, compareSync, hash, hashSync } from 'bcryptjs';

import { IHashProvider } from '../models/IHashProvider';

export class BcryptHashProvider implements IHashProvider {
  public async generateHash(text: string, saltLength = 8): Promise<string> {
    return hash(text, saltLength);
  }

  public generateHashSync(text: string, saltLength: 8): string {
    return hashSync(text, saltLength);
  }

  public async compareHash(text: string, hashed: string): Promise<boolean> {
    return compare(text, hashed);
  }

  public compareHashSync(text: string, hashed: string): boolean {
    return compareSync(text, hashed);
  }
}
