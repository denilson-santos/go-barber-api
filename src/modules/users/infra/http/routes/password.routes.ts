import { ForgotPasswordController } from '../controllers/ForgotPasswordController';
import { ResetPasswordController } from '../controllers/ResetPasswordController';

import { Router } from 'express';

export const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);
