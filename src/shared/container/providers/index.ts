import { container } from 'tsyringe';

import { DiskStorageProvider } from './StorageProvider/implementations/DiskStorageProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from './MailProvider/models/IMailProvider';
import { IStorageProvider } from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
);
