import express, { Request, Response } from 'express';
import { requireAuth } from '@worth-it/common';
import { Message } from '../models/message';

const router = express.Router();

router.get(
  '/api/messages/buyer/annonce/:annonceId',
  requireAuth,
  async (req: Request, res: Response) => {
    const messagesBuyer = await Message.find({
      userId: req.currentUser!.id,
    }).populate({
      path: 'annonce',
      match: { _id: { $eq: req.params.annonceId } },
    });

    const messagesBuyerForThisAnnonce = [];
    for (let message of messagesBuyer) {
      if (message.annonce !== null) {
        messagesBuyerForThisAnnonce.push(message);
      }
    }

    res.send(messagesBuyerForThisAnnonce);
  }
);

export { router as indexMessagesBuyerRouter };
