import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../models/IMailProvider';

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error(`Failed to create a testing account. ${err.message}`);
      }

      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  public async sendEmail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarber <contato@gobarber.com>',
      to,
      subject: 'Recuperação de senha: ',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
