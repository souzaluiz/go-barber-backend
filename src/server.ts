import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes';

import AppError from './errors/AppError';

import './database';
import uploadConfig from './config/upload';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    console.error(error);

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error.' });
  },
);

app.listen(process.env.PORT || 3333);
