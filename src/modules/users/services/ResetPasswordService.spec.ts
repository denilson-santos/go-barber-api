import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { FakeUserTokensRepository } from '../repositories/fakes/FakeUserTokensRepository';
import { ResetPasswordService } from './ResetPasswordService';

import AppError from '@shared/errors/AppErrors';

let usersRepository: FakeUsersRepository;
let userTokensRepository: FakeUserTokensRepository;
let hashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    userTokensRepository = new FakeUserTokensRepository();
    hashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(usersRepository, hashProvider);

    resetPasswordService = new ResetPasswordService(
      usersRepository,
      userTokensRepository,
      hashProvider
    );
  });

  it('should reset password', async () => {
    const user = await createUserService.execute({
      name: 'Denilson',
      email: 'denilson@gmail.com',
      password: '123456789',
    });

    const userToken = await userTokensRepository.generate(user.id);

    await expect(
      resetPasswordService.execute(userToken.token, '987654321')
    ).resolves.toBeUndefined();
  });

  it('not should reset password if token is invalid', async () => {
    await createUserService.execute({
      name: 'Denilson',
      email: 'denilson@gmail.com',
      password: '123456789',
    });

    await expect(
      resetPasswordService.execute('#invalid_token', '987654321')
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not should reset the password if the user does not exist', async () => {
    const userToken = await userTokensRepository.generate('#user_not_found');

    await expect(
      resetPasswordService.execute(userToken.token, '987654321')
    ).rejects.toBeInstanceOf(AppError);
  });
});
