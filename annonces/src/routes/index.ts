import express, { Request, Response } from 'express';
import { Annonce } from '../models/annonce';

const router = express.Router();

router.get('/api/annonces', async (req: Request, res: Response) => {
  const annonces = await Annonce.find({});

  res.send(annonces);
});

export { router as indexAnnonceRouter };
