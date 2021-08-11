import { FakeStorageProvider } from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';

import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService';

import AppError from '@shared/errors/AppErrors';

type SutTypes = {
  createUser: CreateUserService;
  updateUserAvatar: UpdateUserAvatarService;
};

const makeSut = (): SutTypes => {
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeHashProvider = new FakeHashProvider();
  const fakeStorageProvider = new FakeStorageProvider();

  return {
    createUser: new CreateUserService(fakeUsersRepository, fakeHashProvider),
    updateUserAvatar: new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    ),
  };
};

describe('UpdateUserAvatarService', () => {
  it('should return an error if the user who is not authenticated tries to update his avatar', async () => {
    const { updateUserAvatar } = makeSut();

    const user_id = '#123456789';

    const avatarFileName = 'avatar.jpg';

    await expect(
      updateUserAvatar.execute({ user_id, avatarFileName })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should check if there is any old avatar, if there is, it will be deleted before saving the new one', async () => {
    const { createUser, updateUserAvatar } = makeSut();

    const user = await createUser.execute({
      name: 'Denilson da Silva Santos',
      email: 'denilson@gmail.com',
      password: '123456789',
      avatar: 'avatar.jpg',
    });

    const user_id = user.id;

    const avatarFileName = 'avatar-2.jpg';

    expect(
      await updateUserAvatar.execute({ user_id, avatarFileName })
    ).toBeTruthy();
  });
});
