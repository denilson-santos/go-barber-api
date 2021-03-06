import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { FakeUserTokensRepository } from '../repositories/fakes/FakeUserTokensRepository';
import { ResetPasswordService } from './ResetPasswordService';

import AppError from '@shared/errors/AppErrors';
import { FakeCacheProvider } from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let usersRepository: FakeUsersRepository;
let userTokensRepository: FakeUserTokensRepository;
let hashProvider: FakeHashProvider;
let cacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    userTokensRepository = new FakeUserTokensRepository();
    hashProvider = new FakeHashProvider();
    cacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      usersRepository,
      hashProvider,
      cacheProvider
    );

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

    const generateHash = jest.spyOn(hashProvider, 'generateHash');

    await expect(
      resetPasswordService.execute(userToken.token, '987654321')
    ).resolves.toBeUndefined();

    expect(generateHash).toHaveBeenCalledWith('987654321');
  });

  it('should not reset password if token is invalid', async () => {
    await expect(
      resetPasswordService.execute('#invalid_token', '987654321')
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not reset the password if the user does not exist', async () => {
    const userToken = await userTokensRepository.generate('#user_not_found');

    await expect(
      resetPasswordService.execute(userToken.token, '987654321')
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not reset password if token was generated more than 2 hours ago', async () => {
    const user = await createUserService.execute({
      name: 'Denilson',
      email: 'denilson@gmail.com',
      password: '123456789',
    });

    const userToken = await userTokensRepository.generate(user.id);

    const date = new Date();

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => date.setHours(date.getHours() + 3));

    await expect(
      resetPasswordService.execute(userToken.token, '987654321')
    ).rejects.toBeInstanceOf(AppError);
  });
});
