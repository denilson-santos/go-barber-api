import cors from 'cors';

import 'reflect-metadata';

import { errors } from 'celebrate';

import express, { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppErrors';
import createConnection from '@shared/infra/typeorm';
import routes from '@shared/infra/http/routes';
import uploaudConfig from '@config/uploaud';

import 'express-async-errors';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploaudConfig.uploadsFolder));
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

async function createServer(): Promise<void> {
  try {
    console.log('Creating connection...');
    await createConnection;

    app.listen(3333);
    console.log('Listen on port - 3333');
  } catch (error) {
    console.log(`Error on up server! ${error}`);
  }
}

createServer();
