import { container } from 'tsyringe';

import { Request, Response } from 'express';

import { ListProviderDayAvailabilityService } from '@modules/appointments/services/ListProviderDayAvailabilitlyService';

export class ListProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { year, month, day } = request.body;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService
    );

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.json(availability);
  }
}
