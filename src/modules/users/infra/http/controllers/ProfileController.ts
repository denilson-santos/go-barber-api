import { container } from 'tsyringe';

import { Request, Response } from 'express';
import { ShowProfileService } from '@modules/users/services/ShowProfileService';
import { UpdateProfileService } from '@modules/users/services/UpdateProfileService';

export class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute(user_id);

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileService = container.resolve(UpdateProfileService);

    const user_id = request.user.id;

    const { name, email, old_password, password, avatar } = request.body;

    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      old_password,
      password,
      avatar,
    });

    return response.json(user);
  }
}
