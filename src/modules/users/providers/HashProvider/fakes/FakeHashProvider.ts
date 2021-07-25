import { IHashProvider } from '../models/IHashProvider';

export class FakeHashProvider implements IHashProvider {
  public async generateHash(text: string, saltLength: number): Promise<string> {
    return text.length === saltLength ? text : '';
  }

  public generateHashSync(text: string, saltLength: number): string {
    return text.length === saltLength ? text : '';
  }

  public async compareHash(text: string, hashed: string): Promise<boolean> {
    return text === hashed;
  }

  public compareHashSync(text: string, hashed: string): boolean {
    return text === hashed;
  }
}
