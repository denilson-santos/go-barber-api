import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailTemplateProvider } from '../../MailTemplateProvider/models/IMailTemplateProvider';

import { SendMailDTO } from '../dtos/SendMailDTO';

import { IMailProvider } from '../models/IMailProvider';

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
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

  public async sendEmail({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from?.name || 'GoBarber',
        address: from?.email || 'no-reply@gobarber.com',
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
