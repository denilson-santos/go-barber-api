import fs from 'fs';
import path from 'path';

import { IUsersRepository } from '../repositories/IUsersRepository';

import AppError from '@shared/errors/AppErrors';
import uploaudConfig from '@config/uploaud';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(
        uploaudConfig.directory,
        user.avatar
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.usersRepository.update(user);

    return user;
  }
}
