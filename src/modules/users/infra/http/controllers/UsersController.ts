import { container } from 'tsyringe';

import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

export class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      return response.json(user);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}
