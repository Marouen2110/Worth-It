import express, { Request, Response } from 'express';
import {
  BadRequestError,
  DiscussionStatus,
  NotFoundError,
  requireAuth,
} from '@worth-it/common';
import { Annonce } from '../models/annonce';
import { Discussion } from '../models/discussion';

const router = express.Router();

router.post(
  '/api/discussion/annonce/:annonceId',
  requireAuth,
  async (req: Request, res: Response) => {
    const selectedAnnonce = await Annonce.findById(req.params.annonceId);

    if (!selectedAnnonce) {
      throw new NotFoundError();
    }

    if (req.currentUser!.id === selectedAnnonce?.userId) {
      throw new BadRequestError('Can not start a discussion with you self !!');
    }

    const createdAt = new Date();

    const newDiscussion = Discussion.build({
      buyerId: req.currentUser!.id,
      sellerId: selectedAnnonce!.userId,
      createdAt,
      annonceId: selectedAnnonce.id,
      status: DiscussionStatus.Actif,
    });

    await newDiscussion.save();

    res.send(newDiscussion);
  }
);

export { router as newDiscussionRouter };
