import { container } from 'tsyringe';

import { Router } from 'express';

import AuthenticatedUserService from '@modules/users/services/AuthenticatedUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticatedUser = container.resolve(AuthenticatedUserService);

  const { user, token } = await authenticatedUser.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionsRouter;
