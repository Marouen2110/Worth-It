import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  BadRequestError,
  requireAuth,
  validateRequest,
} from '@worth-it/common';
import { natsWrapper } from '../nats-wrapper';
import { Favorite } from '../models/favorite';
import { FavoriteCreatedPublisher } from '../events/publishers/favorite-created-list-publisher';

const router = express.Router();

router.post(
  '/api/favorite/annonce',
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const existedFavorite = await Favorite.findOne({
      userId: req.currentUser!.id,
    });

    if (existedFavorite) {
      throw new BadRequestError(
        `Favorite list for user: ${req.currentUser!.email} already exists`
      );
    }

    const favorite = Favorite.build({
      userId: req.currentUser!.id,
    });

    await favorite.save();

    new FavoriteCreatedPublisher(natsWrapper.client).publish({
      id: favorite.id,
      version: favorite.version,
      userId: favorite.userId,
    });

    res.status(201).send(favorite);
  }
);

export { router as newFavoriteListRouter };
