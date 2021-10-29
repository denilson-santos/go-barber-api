import { container } from 'tsyringe';

import { Request, Response } from 'express';

import { ListProviderAppointmentsService } from '@modules/appointments/services/ListProviderAppointmentsService';

export class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService
    );

    const provider_id = request.user.id;

    const { year, month, day } = request.query;

    const appointments = await listProviderAppointmentsService.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    return response.json(appointments);
  }
}
