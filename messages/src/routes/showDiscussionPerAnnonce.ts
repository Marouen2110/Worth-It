import express, { Request, Response } from 'express';
import { NotFoundError } from '@worth-it/common';
import { Message, MessageDoc } from '../models/message';
import { Annonce } from '../models/annonce';
import { Discussion } from '../models/discussion';

const router = express.Router();

router.get(
  '/api/discussion/:discussionId/',
  async (req: Request, res: Response) => {
    const discussionPerAnnonce = await Discussion.findById(
      req.params.discussionId
    );

    if (!discussionPerAnnonce) {
      throw new NotFoundError();
    }

    const buyerId = discussionPerAnnonce.buyerId;
    const sellerId = discussionPerAnnonce.sellerId;

    const messagesBuyerForThisAnnonce = [];
    const messagesSellerForThisAnnonce = [];

    const discussion = [];

    const messagesBuyer = await Message.find({
      userId: buyerId,
    })
      .populate({
        path: 'discussion',
        match: { _id: { $eq: req.params.discussionId } },
      })
      .populate('annonce');

    for (let message of messagesBuyer) {
      if (message.discussion !== null) {
        messagesBuyerForThisAnnonce.push(message);
        discussion.push(message);
      }
    }

    const messagesSeller = await Message.find({
      userId: sellerId,
    })
      .populate({
        path: 'discussion',
        match: { _id: { $eq: req.params.discussionId } },
      })
      .populate('annonce');

    for (let message of messagesSeller) {
      if (message.discussion !== null) {
        messagesSellerForThisAnnonce.push(message);
        discussion.push(message);
      }
    }

    discussion.sort((a: MessageDoc, b: MessageDoc): number => {
      return a.createdAt.getTime() - b.createdAt.getTime();
    });

    res.send(discussion);
  }
);

export { router as showDiscussionByAnnonceRouter };
