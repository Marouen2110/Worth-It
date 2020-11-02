import express, { Request, Response } from 'express';
import { Comment } from '../models/comment';

const router = express.Router();

router.get('/api/comments', async (req: Request, res: Response) => {
  const comments = await Comment.find({
    userId: req.currentUser!.id,
  }).populate('annonce');

  res.send(comments);
});

export { router as indexCommentRouter };
