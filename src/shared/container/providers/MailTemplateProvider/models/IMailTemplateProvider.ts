import { ParseMailTemplateDTO } from '../dtos/ParseMailTemplateDTO';

export interface IMailTemplateProvider {
  parse(templateData: ParseMailTemplateDTO): Promise<string>;
}
