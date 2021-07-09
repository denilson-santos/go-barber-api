import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

import { Router } from 'express';

import AuthenticatedUserService from '@modules/users/services/AuthenticatedUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const userRepository = new UsersRepository();

  const authenticatedUser = new AuthenticatedUserService(userRepository);

  const { user, token } = await authenticatedUser.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionsRouter;
