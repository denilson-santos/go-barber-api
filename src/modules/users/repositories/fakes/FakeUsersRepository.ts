import { v4 as uuid } from 'uuid';

import { IUsersRepository } from '../IUsersRepository';

import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { FindAllProvidersDTO } from '@modules/users/dtos/FindAllProvidersDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    email,
    password,
    name,
    avatar,
  }: CreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password, avatar });

    this.users.push(user);

    return user;
  }

  public async update(userData: User): Promise<User> {
    this.users = this.users.filter((user) => user.id !== userData.id);

    return this.create(userData);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  public async findAllProviders({
    except_provider_id,
  }: FindAllProvidersDTO): Promise<User[] | undefined> {
    return this.users.filter(
      (user) => !except_provider_id || user.id !== except_provider_id
    );
  }
}
