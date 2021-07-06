import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticateded';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';

import { Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointments = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointments);
});

export default appointmentsRouter;
