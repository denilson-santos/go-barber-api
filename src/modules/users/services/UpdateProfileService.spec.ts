import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { UpdateProfileService } from './UpdateProfileService';

import AppError from '@shared/errors/AppErrors';
import { FakeCacheProvider } from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let cacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    cacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      usersRepository,
      hashProvider,
      cacheProvider
    );
    updateProfileService = new UpdateProfileService(
      usersRepository,
      hashProvider
    );
  });

  it('should be able of show user profile', async () => {
    const user = await createUserService.execute({
      name: 'Denilson',
      email: 'denilson@gmail.com',
      password: '123456789',
    });

    expect(
      await updateProfileService.execute({
        user_id: user.id,
        name: 'Deni',
        email: 'deni@gmail.com',
        password: '987654321',
      })
    ).toHaveProperty('id');
  });

  it('should not be able to update profile of a non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: '#user_not_found',
        name: 'Deni',
        email: 'deni@gmail.com',
        password: '987654321',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
