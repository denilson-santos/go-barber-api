import fs from 'fs';
import path from 'path';

import { IStorageProvider } from '../models/IStorageProvider';

import uploadConfig from '@config/uploaud';

export class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file)
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    if (await this.fileExists(filePath)) fs.promises.unlink(filePath);
  }

  public async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(filePath);

      return true;
    } catch (error) {
      return false;
    }
  }
}
