import express, { Request, Response } from 'express';
import { AnnonceLB } from '../models/annonceLB';
import { createJobId, TaskParams } from '../price3Api';
import { exemple } from '../services/exemple';
import { getAnnonceLeBoncoin } from '../services/scrapinBotApi-leboncoin';

const router = express.Router();

router.post('/api/wi/annonceleboncoin', async (req: Request, res: Response) => {
  const { annonceUrl } = req.body;

  const annonceRequest = await getAnnonceLeBoncoin(annonceUrl);

  const result = await annonceRequest.json();

  const annonceLBTest = await AnnonceLB.build(result);

  // const annonceLBTest = await AnnonceLB.build(exemple);

  annonceLBTest.save();

  res.status(200).send(annonceLBTest);
});

export { router as getAnnonceLeBoncoinRouter };
