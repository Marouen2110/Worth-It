import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@worth-it/common';
import { natsWrapper } from '../nats-wrapper';
import { Favorite } from '../models/favorite';
import { Annonce } from '../models/annonce';
import { FavoriteUpdatedPublisher } from '../events/publishers/favorite-updated-list-publisher';

const router = express.Router();

router.put(
  '/api/favorite/annonce/:annonceId',
  requireAuth,
  async (req: Request, res: Response) => {
    const existedFavorite = await Favorite.findOne({
      userId: req.currentUser!.id,
    }).populate('annonces');

    if (!existedFavorite) {
      throw new NotFoundError();
    }

    if (existedFavorite.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const annoneFavorite = await Annonce.findById(req.params.annonceId);

    existedFavorite.annonces?.push(annoneFavorite!);

    existedFavorite.save();

    new FavoriteUpdatedPublisher(natsWrapper.client).publish({
      id: existedFavorite.id,
      version: existedFavorite.version,
      userId: existedFavorite.userId,
      annonces: existedFavorite.annonces,
    });

    res.send(existedFavorite);
  }
);

export { router as addAnnonceFavoriteRouter };
