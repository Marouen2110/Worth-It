import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError } from '@worth-it/common';
import { Comment } from '../models/comment';

const router = express.Router();

router.get('/api/comments/:id', async (req: Request, res: Response) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    throw new NotFoundError();
  }
  if (comment.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  res.send(comment);
});

export { router as showCommentRouter };
