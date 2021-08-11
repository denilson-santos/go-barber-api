export interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
  fileExists(file: string): Promise<boolean>;
}
