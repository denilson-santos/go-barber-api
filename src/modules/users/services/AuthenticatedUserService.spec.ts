import 'reflect-metadata';

import AuthenticatedUserService from './AuthenticatedUserService';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';

import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppErrors';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticatedUser: AuthenticatedUserService;
let createUser: CreateUserService;

const name = 'Denilson';
const email = 'denilson@gmail.com';
const password = '123456789';

describe('AuthenticatedUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticatedUser = new AuthenticatedUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    expect(await authenticatedUser.execute(user)).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticatedUser.execute({
        email,
        password,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
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
