import 'reflect-metadata';

import { ListProvidersService } from './ListProvidersServices';

import CreateUserService from '@modules/users/services/CreateUserService';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let listProvidersService: ListProvidersService;

describe('ListProvidersServices', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(usersRepository, hashProvider);

    listProvidersService = new ListProvidersService(usersRepository);
  });

  it('should be able to list all providers except the logged user', async () => {
    const user1 = await createUserService.execute({
      name: 'denilson1',
      email: 'denilson1@gmail.com',
      password: '123456789',
    });

    const user2 = await createUserService.execute({
      name: 'denilson2',
      email: 'denilson2@gmail.com',
      password: '123456789',
    });

    const loggedUser = await createUserService.execute({
      name: 'denilson3',
      email: 'denilson3@gmail.com',
      password: '123456789',
    });

    expect(
      await listProvidersService.execute({ except_provider_id: loggedUser.id })
    ).toEqual([user1, user2]);
  });
});
