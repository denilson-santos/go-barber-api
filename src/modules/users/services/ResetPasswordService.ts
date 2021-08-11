import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

import AppError from '@shared/errors/AppErrors';

@injectable()
export class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute(token: string, password: string): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) throw new AppError('Invalid token');

    if (differenceInHours(Date.now(), new Date(userToken.created_at)) > 2) {
      throw new AppError('Expired token');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User not found');

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.update(user);
  }
}
