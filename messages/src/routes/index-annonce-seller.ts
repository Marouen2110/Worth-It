import express, { Request, Response } from 'express';
import { requireAuth } from '@worth-it/common';
import { Message } from '../models/message';

const router = express.Router();

router.get(
  '/api/messages/seller/annonce/:annonceId',
  requireAuth,
  async (req: Request, res: Response) => {
    const messagesSeller = await Message.find({
      userId: req.body.annonceUserId,
    })
      .populate('annonce')
      .find({ id: req.body.annonceId });

    res.send(messagesSeller);
  }
);

export { router as indexMessagesSellerRouter };
