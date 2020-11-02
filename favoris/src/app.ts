import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@worth-it/common';
import { newFavoriteListRouter } from './routes/new';
import { addAnnonceFavoriteRouter } from './routes/add-annonce-favorite';
import { deleteAnnonceFavoriteRouter } from './routes/delete-annonce-favorite';
import { showAnnonceFavoriteListPerUserRouter } from './routes/show-favorite-list';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    sameSite: 'none',
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(newFavoriteListRouter);
app.use(addAnnonceFavoriteRouter);
app.use(deleteAnnonceFavoriteRouter);
app.use(showAnnonceFavoriteListPerUserRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
