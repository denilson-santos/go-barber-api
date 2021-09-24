import { celebrate, Joi, Segments } from 'celebrate';

import { AppointmentController } from '../controllers/AppointmentsController';

import { ProviderAppointmentsController } from '../controllers/ProviderAppointmentsController';

import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticateded';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentController();

const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.create
);
appointmentsRouter.get(
  '/me',
  celebrate({
    [Segments.BODY]: {
      year: Joi.number().required(),
      month: Joi.number().required(),
      day: Joi.number().required(),
    },
  }),
  providerAppointmentsController.index
);

export default appointmentsRouter;
