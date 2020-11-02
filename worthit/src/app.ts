import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@worth-it/common';
import { getOffersRouter } from './routes/getOffers';
import { postJobIdRouter } from './routes/postJob';
import { getAnnonceLeBoncoinRouter } from './routes/getAnnonceLB';
import { indexAnnoncesLBRouter } from './routes/indexAnnonceLB';
import { worthitTagRouter } from './routes/worth-it-tag';
import { showAnnonceLBCRouter } from './routes/showAnnonceLBC';
import { indexOffersAPIRouter } from './routes/indexOffers';
import { postJobIdTestRouter } from './routes/posttest';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
    sameSite: 'none',
  })
);

app.use(currentUser);
app.use(getOffersRouter);
app.use(postJobIdRouter);
app.use(getAnnonceLeBoncoinRouter);
app.use(indexAnnoncesLBRouter);
app.use(worthitTagRouter);
app.use(showAnnonceLBCRouter);
app.use(indexOffersAPIRouter);
// app.use(postJobIdTestRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
