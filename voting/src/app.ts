import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@worth-it/common';
import { voteAnnonceIncrement } from './routes/incrementVote';
import { voteAnnonceDecrement } from './routes/decrementVote';
import { voteAnnonceInctDecUpdated } from './routes/update-increment-decrement-vote';

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

app.use(voteAnnonceIncrement);
app.use(voteAnnonceDecrement);
app.use(voteAnnonceInctDecUpdated);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
