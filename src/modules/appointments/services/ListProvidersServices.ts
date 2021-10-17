import { inject, injectable } from 'tsyringe';

import { FindAllProvidersDTO } from '@modules/users/dtos/FindAllProvidersDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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
    let providers = await this.cacheProvider.recover<User[] | undefined>(
      `providers-list:${user_id}`
    );

    if (!providers) {
      providers = await this.usersRepository.findAllProviders({
        except_provider_id: user_id,
      });

      await this.cacheProvider.save(`providers-list:${user_id}`, providers);
    }

    return providers;
  }
}
