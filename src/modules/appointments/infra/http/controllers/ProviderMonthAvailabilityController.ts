import { container } from 'tsyringe';

import { Request, Response } from 'express';

import { ListProviderMonthAvailabilityService } from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { month, year } = request.query;

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService
    );

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
