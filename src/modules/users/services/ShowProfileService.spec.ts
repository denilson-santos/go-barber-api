import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { ShowProfileService } from './ShowProfileService';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let showProfileService: ShowProfileService;
let createUserService: CreateUserService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();

    showProfileService = new ShowProfileService(usersRepository);
    createUserService = new CreateUserService(usersRepository, hashProvider);
  });

  it('should be able of show user profile', async () => {
    const user = await createUserService.execute({
      name: 'Denilson',
      email: 'denilson@gmail.com',
      password: '123456789',
    });

    expect(await showProfileService.execute(user.id)).toHaveProperty('id');
  });
});
