import 'reflect-metadata';

import AuthenticatedUserService from './AuthenticatedUserService';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';

import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppErrors';

type SutTypes = {
  authenticatedUser: AuthenticatedUserService;
  createUser: CreateUserService;
};

const makeSut = (): SutTypes => {
  const fakeUserRepository = new FakeUsersRepository();
  const fakeHashProvider = new FakeHashProvider();

  return {
    authenticatedUser: new AuthenticatedUserService(
      fakeUserRepository,
      fakeHashProvider
    ),
    createUser: new CreateUserService(fakeUserRepository, fakeHashProvider),
  };
};

const name = 'Denilson';
const email = 'denilson@gmail.com';
const password = '123456789';

describe('AuthenticatedUserService', () => {
  it('should be able to authenticate', async () => {
    const { authenticatedUser, createUser } = makeSut();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    expect(await authenticatedUser.execute(user)).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    const { authenticatedUser } = makeSut();

    await expect(
      authenticatedUser.execute({
        email,
        password,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const { authenticatedUser, createUser } = makeSut();

    await createUser.execute({
      name,
      email,
      password,
    });

    await expect(
      authenticatedUser.execute({
        email,
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
