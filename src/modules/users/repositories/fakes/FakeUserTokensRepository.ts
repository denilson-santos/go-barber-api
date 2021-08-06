import { v4 as uuid } from 'uuid';

import { IUserTokensRepository } from '../IUserTokensRepository';

import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';

export class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      user_id,
      token: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.userTokens.find((userToken) => userToken.token === token);
  }
}
