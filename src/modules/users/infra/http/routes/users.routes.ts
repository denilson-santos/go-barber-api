import multer from 'multer';

import { celebrate, Joi, Segments } from 'celebrate';

import { UsersController } from '../controllers/UsersController';

import { UserAvatarController } from '../controllers/UserAvatarController';

import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticateded';
import uploadConfig from '@config/uploaud';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);

export default usersRouter;
