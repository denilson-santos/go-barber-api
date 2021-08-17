import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import { IUsersRepository } from '../repositories/IUsersRepository';

import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppErrors';

type Request = {
  user_id: string;
  name?: string;
  email?: string;
  old_password?: string;
  password?: string;
  avatar?: string;
};

@injectable()
export class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    avatar,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    if (user_id) user.id = user_id;

    if (name) user.name = name;

    if (email) user.email = email;

    if (password) {
      const newPassword = await this.hashProvider.generateHash(password);

      user.password = newPassword;
    }

    if (avatar) user.avatar = avatar;

    return this.usersRepository.update(user);
  }
}
