import { NotFoundError } from '@worth-it/common';
import express, { Request, Response } from 'express';
import { AnnonceLB } from '../models/annonceLB';

const router = express.Router();

router.get('/api/wi/annonceslb/:id', async (req: Request, res: Response) => {
  const annonceLBCById = await AnnonceLB.findById(req.params.id);

  if (!annonceLBCById) {
    throw new NotFoundError();
  }
  res.send(annonceLBCById);
});

export { router as showAnnonceLBCRouter };
