import express, { Request, Response } from 'express';
import { Comment } from '../models/comment';

const router = express.Router();

router.get('/api/comments/annonce/:id', async (req: Request, res: Response) => {
  const comments = await Comment.find({ annonceId: req.params.id });

  res.send(comments);
});

export { router as indexCommentsAnnonceRouter };
