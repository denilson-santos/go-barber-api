import { compare, compareSync, hash } from 'bcryptjs';

import { IHashProvider } from '../models/IHashProvider';

export class BcryptHashProvider implements IHashProvider {
  public generateHash(text: string, saltLength: number): Promise<string> {
    return hash(text, saltLength);
  }

  public compareHash(text: string, hashed: string): Promise<boolean> {
    return compare(text, hashed);
  }

  public compareHashSync(text: string, hashed: string): boolean {
    return compareSync(text, hashed);
  }
}
