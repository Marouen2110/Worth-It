import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@worth-it/common';
import { Annonce, AnnonceDoc } from '../models/annonce';
import { FilterQuery } from 'mongoose';
import { buildQuery } from '../services/buildQuery';
const router = express.Router();

router.get(
  '/api/search/annonces/bytitle',

  async (req: Request, res: Response) => {
    const criteria = {
      // age: { min: req.params.min, max: req.params.max },
      title: req.params.title,
    };
    const sortProprety: string = 'title';
    const offset = 0;
    const limit = 20;

    const annonce = await Annonce.find(buildQuery(criteria))
      .sort({ [sortProprety]: 1 })
      .skip(offset)
      .limit(limit);

    const query = Promise.all([
      annonce,
      Annonce.find(buildQuery(criteria)).countDocuments(),
    ]).then((results) => {
      return {
        all: results[0],
        count: results[1],
        offset: offset,
        limit: limit,
      };
    });

    res.send(query);
  }
);

export { router as getSearcheByNameRouter };
