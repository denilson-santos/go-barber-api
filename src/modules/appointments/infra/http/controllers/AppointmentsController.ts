import { container } from 'tsyringe';

import { Request, Response } from 'express';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { provider_id, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointments = await createAppointment.execute({
      date,
      provider_id,
      user_id,
    });

    return response.json(appointments);
  }
}
