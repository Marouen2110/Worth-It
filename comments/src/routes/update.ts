import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@worth-it/common';
import { Comment } from '../models/comment';
import { natsWrapper } from '../nats-wrapper';
import { CommentUpdatedPublisher } from '../events/publishers/comment-updated-publisher';

const router = express.Router();

router.put(
  '/api/comments/:id',
  requireAuth,
  [body('text').not().isEmpty().withMessage('Empty comments is not accepted')],
  validateRequest,
  async (req: Request, res: Response) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      throw new NotFoundError();
    }

    if (comment.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    const modifiedAt = new Date();

    comment.set({
      text: req.body.text,
      createdAt: modifiedAt,
    });

    await comment.save();

    new CommentUpdatedPublisher(natsWrapper.client).publish({
      id: comment.id,
      text: comment.text,
      createdAt: comment.createdAt.toISOString(),
      userId: comment.userId,
      annonceId: comment.annonce.id,
      version: comment.version,
    });

    res.status(200).send(comment);
  }
);

export { router as updateCommentRouter };
