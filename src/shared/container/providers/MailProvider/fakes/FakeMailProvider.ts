import { IMailProvider } from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  public async sendEmail(to: string, body: string): Promise<void> {
    this.messages.push({ to, body });
  }
}
