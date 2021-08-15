import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';

import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppErrors';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

const name = 'Denilson';
const email = 'denilson@gmail.com';
const password = '123456789';

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to create a user', async () => {
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to save a user already exist', async () => {
    await createUser.execute({
      name,
      email,
      password,
    });

    await expect(
      createUser.execute({
        name,
        email,
        password,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
