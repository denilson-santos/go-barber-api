import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';

import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppErrors';
import { FakeCacheProvider } from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('should be able to create a user', async () => {
    const user = await createUser.execute({
      name: 'Denilson',
      email: 'denilson@gmail.com',
      password: '123456789',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to save a user already exist', async () => {
    await createUser.execute({
      name: 'Denilson',
      email: 'denilson@gmail.com',
      password: '123456789',
    });

    await expect(
      createUser.execute({
        name: 'Denilson',
        email: 'denilson@gmail.com',
        password: '123456789',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
