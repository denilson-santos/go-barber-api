import cors from 'cors';

import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';
import AppError from '@shared/errors/AppErrors';
import routes from '@shared/infra/http/routes';
import uploaudConfig from '@config/uploaud';

import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploaudConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333);
