import { ProvidersController } from '../controllers/ProvidersController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticateded';
import { Router } from 'express';

export const providersRouter = Router();

const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
