import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  validateRequest,
  VotingStatus,
} from '@worth-it/common';
import { body } from 'express-validator';
import { natsWrapper } from '../nats-wrapper';
import { Annonce } from '../models/annonce';
import { AnnonceVoteDecrementPublisher } from '../events/publisher/annonceVote-decrement-publisher';
import { Voting } from '../models/voting';

const router = express.Router();

router.post(
  '/api/vote/annonce/:annonceId/decrement',
  requireAuth,
  [
    body('annonceId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Annonce Id must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { annonceId } = req.params;

    // Find the advert(annonce) the user is trying to upvote in the database
    const annonce = await Annonce.findById(annonceId);
    if (!annonce) {
      throw new NotFoundError();
    }

    for (let voter of annonce.voters) {
      if (voter == req.currentUser!.id) {
        throw new BadRequestError('You have already voted !!');
      }
    }

    const userId = req.currentUser!.id;
    const voters: Array<string> = annonce.voters;
    voters.push(userId);
    // upvote the advert(annonce)
    annonce.set({
      voteCount: annonce.voteCount - 1,
      voters,
    });

    await annonce.save();

    const voting = Voting.build({
      userId,
      status: VotingStatus.LikeVote,
      annonce,
    });

    await voting.save();

    new AnnonceVoteDecrementPublisher(natsWrapper.client).publish({
      id: voting.id,
      version: voting.version,
      status: voting.status,
      userId: voting.userId,
      annonce: {
        id: annonce.id,
        voteCount: annonce.voteCount,
        voters: annonce.voters,
      },
    });
    res.status(201).send(annonce);
  }
);

export { router as voteAnnonceDecrement };
