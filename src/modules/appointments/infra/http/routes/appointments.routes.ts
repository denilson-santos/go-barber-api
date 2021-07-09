import { parseISO } from 'date-fns';

import { Router } from 'express';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticateded';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentRepository = getCustomRepository(AppointmentRepository);

//   const appointments = await appointmentRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentRepository = new AppointmentsRepository();

  const createAppointment = new CreateAppointmentService(appointmentRepository);

  const appointments = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointments);
});

export default appointmentsRouter;
