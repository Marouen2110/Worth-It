import express, { Request, Response } from 'express';
import { AnnonceLB } from '../models/annonceLB';
import { GetQuery } from '../models/queryPrice3Idealo';

const router = express.Router();

router.get('/api/wi/offers', async (req: Request, res: Response) => {
  const offersQuery = await GetQuery.find({});

  res.send(offersQuery);
});

export { router as indexOffersAPIRouter };
