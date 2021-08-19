import { ProfileController } from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticateded';

import { Router } from 'express';

export const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.get('/', ensureAuthenticated, profileController.show);
profileRouter.put('/', ensureAuthenticated, profileController.update);
