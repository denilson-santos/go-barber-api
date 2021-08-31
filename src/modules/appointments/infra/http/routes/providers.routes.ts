import { ProvidersController } from '../controllers/ProvidersController';

import { ListProviderMonthAvailabilityController } from '../controllers/ListProviderMonthAvailabilityController';

import { ListProviderDayAvailabilityController } from '../controllers/ListProviderDayAvailabilityController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticateded';
import { Router } from 'express';

export const providersRouter = Router();

const providersController = new ProvidersController();

const listProviderMonthAvailabilityController =
  new ListProviderMonthAvailabilityController();

const listProviderDayAvailabilityController =
  new ListProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  listProviderMonthAvailabilityController.index
);
providersRouter.get(
  '/:provider_id/day-availability',
  listProviderDayAvailabilityController.index
);
