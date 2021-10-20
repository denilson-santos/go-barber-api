import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRepository';

import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppErrors';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,

    @inject('HashProvider') private hashProvider: IHashProvider,

    @inject('CacheProvider') private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User> {
    const checkIfExists = await this.usersRepository.findByEmail(email);

    if (checkIfExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}
