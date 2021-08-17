import { ProfileController } from '../controllers/ProfileController';

import { Router } from 'express';

export const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.get('/', profileController.show);
profileRouter.put('/update', profileController.update);
