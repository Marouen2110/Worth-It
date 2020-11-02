import express, { Request, Response } from 'express';
import {
  MessageStatus,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@worth-it/common';
import { natsWrapper } from '../nats-wrapper';
import { Message } from '../models/message';
import { MessageDeletedPublisher } from '../events/publishers/message-deleted-publisher';

const router = express.Router();

router.delete(
  `/api/messages/:messageId/annonce/:annonceId`,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { messageId } = req.params;

    // Find the advert the user is trying to order in the database
    const message = await Message.findById(messageId).populate('annonce');
    if (!message) {
      throw new NotFoundError();
    }

    if (message.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    message.createdAt = new Date();
    message.status = MessageStatus.Deleted;
    await message.save();

    // Publish an event saying that a message was created
    new MessageDeletedPublisher(natsWrapper.client).publish({
      id: message.id,
      version: message.version,
      annonce: {
        id: message.annonce.id,
      },
    });
    res.status(204).send(message);
  }
);

export { router as deletedMessageRouter };
