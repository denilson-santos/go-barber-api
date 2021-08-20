import { getRepository, Not, Repository } from 'typeorm';

import User from '../entities/User';

import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { FindAllProvidersDTO } from '@modules/users/dtos/FindAllProvidersDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  public findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async findAllProviders({
    except_provider_id,
  }: FindAllProvidersDTO): Promise<User[] | undefined> {
    return this.ormRepository.find(
      except_provider_id
        ? {
            where: { id: Not(except_provider_id) },
          }
        : {}
    );
  }
}
