import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppErrors';

describe('CreateUserService', () => {
  const fakeUserRepository = new FakeUsersRepository();
  const createUser = new CreateUserService(fakeUserRepository);

  const name = 'Denilson';
  const email = 'denilson@gmail.com';
  const password = '123456789';

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
    ).toThrow();
  });
});
