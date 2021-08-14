import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRepository';

import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

import AppError from '@shared/errors/AppErrors';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';

@injectable()
export class SendEmailForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('User not found');

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendEmail({
      to: { name: user.name, email: user.email },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        filePath: 'users|mails|forgot-password.hbs',
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset-password?token=${token}`,
        },
      },
    });
  }
}
