import express, { Request, Response } from 'express';
import { AnnonceLB } from '../models/annonceLB';

const router = express.Router();

router.get('/api/wi/annonceslb', async (req: Request, res: Response) => {
  const annonces = await AnnonceLB.find({});

  res.send(annonces);
});

export { router as indexAnnoncesLBRouter };
