import { container } from 'tsyringe';

import { Request, Response } from 'express';
import { ListProvidersService } from '@modules/appointments/services/ListProvidersServices';

export class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const except_provider_id = request.user.id;

    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute({
      except_provider_id,
    });

    return response.json(providers);
  }
}
