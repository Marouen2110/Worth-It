import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@worth-it/common';
import { createdCommentRouter } from './routes/new';
import { updateCommentRouter } from './routes/update';
import { indexCommentRouter } from './routes';
import { showCommentRouter } from './routes/show';
import { indexCommentsAnnonceRouter } from './routes/indexAnnonceComments';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);
app.use(createdCommentRouter);
app.use(showCommentRouter);
app.use(indexCommentRouter);
app.use(indexCommentsAnnonceRouter);
app.use(updateCommentRouter),
  app.all('*', async (req, res) => {
    throw new NotFoundError();
  });

app.use(errorHandler);

export { app };
