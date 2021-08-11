import { container } from 'tsyringe';

import { Request, Response } from 'express';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService);

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      return response.json(user);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}
