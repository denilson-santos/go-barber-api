import { IMailProvider } from '../models/IMailProvider';
import { SendMailDTO } from '../dtos/SendMailDTO';

export class FakeMailProvider implements IMailProvider {
  private messages: SendMailDTO[] = [];

  public async sendEmail(message: SendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
