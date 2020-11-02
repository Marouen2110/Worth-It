import express, { Request, Response } from 'express';
import { NotFoundError } from '@worth-it/common';
import { Annonce } from '../models/annonce';

const router = express.Router();

router.get('/api/annonces/:id', async (req: Request, res: Response) => {
  const annonce = await Annonce.findById(req.params.id);

  if (!annonce) {
    throw new NotFoundError();
  }

  res.send(annonce);
});

export { router as showAnnonceRouter };
