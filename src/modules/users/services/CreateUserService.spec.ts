import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';

import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppErrors';

const makeSut = (): CreateUserService => {
  const fakeUserRepository = new FakeUsersRepository();
  const fakeHashProvider = new FakeHashProvider();

  return new CreateUserService(fakeUserRepository, fakeHashProvider);
};

const name = 'Denilson';
const email = 'denilson@gmail.com';
const password = '123456789';

describe('CreateUserService', () => {
  it('should be able to create a user', async () => {
    const createUser = makeSut();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to save a user already exist', async () => {
    const createUser = makeSut();

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
