import { container } from 'tsyringe';

import { DiskStorageProvider } from './StorageProvider/implementations/DiskStorageProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { HandlebarsMailTemplateProvider } from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import { IMailProvider } from './MailProvider/models/IMailProvider';
import { IMailTemplateProvider } from './MailTemplateProvider/models/IMailTemplateProvider';
import { IStorageProvider } from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
);
