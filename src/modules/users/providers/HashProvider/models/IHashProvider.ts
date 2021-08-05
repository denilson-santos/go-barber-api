export interface IHashProvider {
  generateHash(text: string, saltLength?: number): Promise<string>;
  generateHashSync(text: string, saltLength?: number): string;
  compareHash(text: string, hashed: string): Promise<boolean>;
  compareHashSync(text: string, hashed: string): boolean;
}
