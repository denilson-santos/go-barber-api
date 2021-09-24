import { celebrate, Joi, Segments } from 'celebrate';

import { ProvidersController } from '../controllers/ProvidersController';

import { ProviderMonthAvailabilityController } from '../controllers/ProviderMonthAvailabilityController';

import { ProviderDayAvailabilityController } from '../controllers/ProviderDayAvailabilityController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticateded';
import { Router } from 'express';

export const providersRouter = Router();

const providersController = new ProvidersController();

const providerMonthAvailabilityController =
  new ProviderMonthAvailabilityController();

const providerDayAvailabilityController =
  new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      year: Joi.number().required(),
      month: Joi.number().required(),
    },
  }),
  providerMonthAvailabilityController.index
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      year: Joi.number().required(),
      month: Joi.number().required(),
      day: Joi.number().required(),
    },
  }),
  providerDayAvailabilityController.index
);
