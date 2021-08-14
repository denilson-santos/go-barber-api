import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';

import { IMailTemplateProvider } from '../models/IMailTemplateProvider';
import { ParseMailTemplateDTO } from '../dtos/ParseMailTemplateDTO';

export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    filePath,
    variables,
  }: ParseMailTemplateDTO): Promise<string> {
    const parsedFilePath = filePath.split('|');

    const sourcePath = path.resolve('src', 'modules', ...parsedFilePath);

    const source = await fs.promises.readFile(sourcePath, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(source);

    return parseTemplate(variables);
  }
}
