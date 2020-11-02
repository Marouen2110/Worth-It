import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
  VotingStatus,
} from '@worth-it/common';
import { body } from 'express-validator';
import { natsWrapper } from '../nats-wrapper';
import { Voting } from '../models/voting';
import { AnnonceVoteUpdatePublisher } from '../events/publisher/annonceVote-update-publisher';

const router = express.Router();

router.put(
  '/api/vote/:votingId/annonce/:annonceId',
  requireAuth,

  validateRequest,
  async (req: Request, res: Response) => {
    const { votingId } = req.params;
    // Find the advert(annonce) the user is trying to upvote in the database
    const voting = await Voting.findById(votingId).populate('annonce');
    if (!voting) {
      throw new NotFoundError();
    }

    if (voting.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    // update the advert(annonce)

    if (voting.status === VotingStatus.LikeVote) {
      voting.status = VotingStatus.DislikeVote;
      voting.annonce.set({
        voteCount: voting.annonce.voteCount - 1,
      });
    } else if (voting.status === VotingStatus.DislikeVote) {
      voting.status = VotingStatus.LikeVote;
      voting.annonce.set({
        voteCount: voting.annonce.voteCount + 1,
      });
    }

    await voting.save();

    new AnnonceVoteUpdatePublisher(natsWrapper.client).publish({
      id: voting.id,
      version: voting.version,
      status: voting.status,
      userId: voting.userId,
      annonce: {
        id: voting.annonce.id,
        voteCount: voting.annonce.voteCount,
      },
    });

    res.status(201).send(voting);
  }
);

export { router as voteAnnonceInctDecUpdated };
