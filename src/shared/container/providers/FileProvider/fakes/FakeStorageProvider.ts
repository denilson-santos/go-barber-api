import { IStorageProvider } from '../models/IStorageProvider';

export class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    this.storage = this.storage.filter((storageFile) => storageFile !== file);
  }

  public async fileExists(file: string): Promise<boolean> {
    return Boolean(this.storage.find((storageFile) => storageFile === file));
  }
}
