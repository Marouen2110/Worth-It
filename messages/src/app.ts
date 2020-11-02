import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@worth-it/common';
import { createdMessageRouter } from './routes/newMessage';
import { updatedMessageRouter } from './routes/updateMessage';
import { deletedMessageRouter } from './routes/deleteMessage';
import { indexMessagesBuyerRouter } from './routes/index-annonce-buyer';
import { indexMessagesSellerRouter } from './routes/index-annonce-seller';
import { indexIdAnnonceMessagePerUser } from './routes/show';
import { showDiscussionByAnnonceRouter } from './routes/showDiscussionPerAnnonce';
import { newDiscussionRouter } from './routes/newDiscussion';
import { desactivateDiscussionRouter } from './routes/desactivateDiscussion';

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

app.use(createdMessageRouter);
app.use(updatedMessageRouter);
app.use(deletedMessageRouter);
app.use(indexMessagesBuyerRouter);
app.use(indexMessagesSellerRouter);
app.use(indexIdAnnonceMessagePerUser);
app.use(showDiscussionByAnnonceRouter);
app.use(newDiscussionRouter);
app.use(desactivateDiscussionRouter);
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
