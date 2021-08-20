import { inject, injectable } from 'tsyringe';

import { FindAllProvidersDTO } from '@modules/users/dtos/FindAllProvidersDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
export class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    except_provider_id,
  }: FindAllProvidersDTO): Promise<User[] | undefined> {
    return this.usersRepository.findAllProviders({ except_provider_id });
  }
}
