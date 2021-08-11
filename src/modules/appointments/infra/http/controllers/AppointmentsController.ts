import { parseISO } from 'date-fns';

import { container } from 'tsyringe';

import { Request, Response } from 'express';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id, date } = request.body;

      const parsedDate = parseISO(date);

      const createAppointment = container.resolve(CreateAppointmentService);

      const appointments = await createAppointment.execute({
        date: parsedDate,
        provider_id,
      });

      return response.json(appointments);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}
