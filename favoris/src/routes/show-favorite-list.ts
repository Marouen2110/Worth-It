import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@worth-it/common';
import { Favorite } from '../models/favorite';

const router = express.Router();

router.get(
  '/api/favorite/annonce/',
  requireAuth,
  async (req: Request, res: Response) => {
    const favoriteList = await Favorite.findOne({
      userId: req.currentUser!.id,
    }).populate('annonces');

    if (!favoriteList) {
      throw new NotFoundError();
    }

    if (favoriteList.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(favoriteList.annonces);
  }
);

export { router as showAnnonceFavoriteListPerUserRouter };
