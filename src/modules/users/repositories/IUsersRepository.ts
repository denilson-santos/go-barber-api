import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { FindAllProvidersDTO } from '../dtos/FindAllProvidersDTO';
import User from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAllProviders(options: FindAllProvidersDTO): Promise<User[] | undefined>;
}
