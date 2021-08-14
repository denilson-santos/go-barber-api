import { ParseMailTemplateDTO } from '../../MailTemplateProvider/dtos/ParseMailTemplateDTO';

type MailContact = {
  name: string;
  email: string;
};

export type SendMailDTO = {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: ParseMailTemplateDTO;
};
