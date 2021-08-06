import { getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { UserToken } from '../entities/UserToken';

import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';

export class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    return this.ormRepository.create({ id: uuid(), user_id, token: uuid() });
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.ormRepository.findOne({ where: { token } });
  }
}
