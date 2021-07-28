import { container } from 'tsyringe';

import { DiskStorageProvider } from './FileProvider/implementations/DiskStorageProvider';
import { IStorageProvider } from './FileProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'DiskStorageProvider',
  DiskStorageProvider
);
