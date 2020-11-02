import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@worth-it/common';
import { createAnnonceRouter } from './routes/new';
import { showAnnonceRouter } from './routes/show';
import { indexAnnonceRouter } from './routes';
import { updateAnnonceRouter } from './routes/update';
import { imageUploadAnnonceRouter } from './routes/uploadImageS3';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);
app.use(createAnnonceRouter);
app.use(showAnnonceRouter);
app.use(indexAnnonceRouter);
app.use(updateAnnonceRouter);
app.use(imageUploadAnnonceRouter),
  app.all('*', async (req, res) => {
    throw new NotFoundError();
  });

app.use(errorHandler);

export { app };
