import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRepository';

import { IStorageProvider } from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';

import AppError from '@shared/errors/AppErrors';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) await this.storageProvider.deleteFile(user.avatar);

    user.avatar = avatarFileName;

    await this.storageProvider.saveFile(user.avatar);

    await this.usersRepository.update(user);

    return user;
  }
}
