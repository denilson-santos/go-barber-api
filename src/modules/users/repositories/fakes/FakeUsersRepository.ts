import { v4 as uuid } from 'uuid';

import { IUsersRepository } from '../IUsersRepository';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    email,
    password,
    name,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

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
}
