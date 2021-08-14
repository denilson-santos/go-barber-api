import { SendMailDTO } from '../dtos/SendMailDTO';

export interface IMailProvider {
  sendEmail(data: SendMailDTO): Promise<void>;
}
