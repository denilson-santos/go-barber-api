import { AppointmentController } from '../controllers/AppointmentsController';

import { ProviderAppointmentsController } from '../controllers/ProviderAppointmentsController';

import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticateded';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentController();

const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
