import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@worth-it/common';
import { Annonce } from '../models/annonce';

const router = express.Router();

router.get(
  '/api/search/annonces/pricerange',
  async (req: Request, res: Response) => {
    const minQuery = await Annonce.find({})
      .sort({ price: 1 })
      .limit(1)
      .then((annonces) => annonces[0].price);

    const maxQuery = await Annonce.find({})
      .sort({ price: -1 })
      .limit(1)
      .then((annonces) => annonces[0].price);

    const query = Promise.all([minQuery, maxQuery]).then((result) => {
      return {
        min: result[0],
        max: result[1],
      };
    });
    res.send(query);
  }
);

export { router as getPriceRangeRouter };
