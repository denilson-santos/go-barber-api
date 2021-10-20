import { inject, injectable } from 'tsyringe';

import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

type Request = {
  user_id?: string;
};

@injectable()
export class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id }: Request): Promise<User[] | undefined> {
    const cacheKey = `providers-list:${user_id}`;

    let providers = await this.cacheProvider.recover<User[] | undefined>(
      cacheKey
    );

    if (!providers) {
      providers = await this.usersRepository.findAllProviders({
        except_provider_id: user_id,
      });

      await this.cacheProvider.save<User[] | undefined>(cacheKey, providers);
    }

    return providers;
  }
}
