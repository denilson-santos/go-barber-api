import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { SendEmailForgotPasswordService } from './SendEmailForgotPasswordService';

import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

import { FakeUserTokensRepository } from '../repositories/fakes/FakeUserTokensRepository';

import AppError from '@shared/errors/AppErrors';

import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

let usersRepository: FakeUsersRepository;
let userTokensRepository: FakeUserTokensRepository;
let mailProvider: FakeMailProvider;
let hashProvider: FakeHashProvider;
let createUser: CreateUserService;
let sendEmailForgotPassword: SendEmailForgotPasswordService;

describe('SendEmailForgotPasswordService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    userTokensRepository = new FakeUserTokensRepository();
    mailProvider = new FakeMailProvider();
    hashProvider = new FakeHashProvider();

    createUser = new CreateUserService(usersRepository, hashProvider);

    sendEmailForgotPassword = new SendEmailForgotPasswordService(
      usersRepository,
      userTokensRepository,
      mailProvider
    );
  });

  it('must be able to send an email to reset your password', async () => {
    const user = await createUser.execute({
      name: 'Denilson',
      email: 'denilson@gmail.com',
      password: '123456789',
    });

    const sendEmail = jest.spyOn(mailProvider, 'sendEmail');

    await sendEmailForgotPassword.execute(user.email);

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should return an error when trying to reset the password if the user entered does not exist', async () => {
    await expect(
      sendEmailForgotPassword.execute('denilson@gmail.com')
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const user = await createUser.execute({
      name: 'Denilson',
      email: 'denilson@gmail.com',
      password: '123456789',
    });

    const generateToken = jest.spyOn(userTokensRepository, 'generate');

    await sendEmailForgotPassword.execute(user.email);

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
