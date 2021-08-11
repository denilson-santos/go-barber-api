import { container } from 'tsyringe';

import { Request, Response } from 'express';

import { SendEmailForgotPasswordService } from '@modules/users/services/SendEmailForgotPasswordService';

export class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body;

      const sendEmailForgotPasswordService = container.resolve(
        SendEmailForgotPasswordService
      );

      await sendEmailForgotPasswordService.execute(email);

      return response.status(204).json();
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}
