import { NotFoundError, requireAuth, validateRequest } from '@worth-it/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { natsWrapper } from '../nats-wrapper';
import { Comment } from '../models/comment';
import { CommentCreatedPublisher } from '../events/publishers/comment-created-publisher';
import mongoose from 'mongoose';
import { Annonce } from '../models/annonce';

const router = express.Router();

router.post(
  '/api/comments',
  requireAuth,
  [
    body('text').not().isEmpty().withMessage('Empty comments is not accepted'),
    body('annonceId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input)),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { text, annonceId } = req.body;
    // Find the advert the user is trying to comment in the database
    const annonce = await Annonce.findById(annonceId);
    if (!annonce) {
      throw new NotFoundError();
    }

    const createdAt = new Date();
    const comment = Comment.build({
      text,
      userId: req.currentUser!.id,
      annonce,
      createdAt: createdAt,
    });
    await comment.save();

    // Publish an event saying that a comment was created
    new CommentCreatedPublisher(natsWrapper.client).publish({
      id: comment.id,
      text: comment.text,
      annonceId: comment.annonce.id,
      userId: comment.userId,
      createdAt: comment.createdAt.toISOString(),
    });

    res.status(201).send(comment);
  }
);

export { router as createdCommentRouter };
