import express, { Request, Response } from 'express';
import {
  MessageStatus,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@worth-it/common';
import { body } from 'express-validator';
import { natsWrapper } from '../nats-wrapper';
import { Message } from '../models/message';
import { MessageUpdatedPublisher } from '../events/publishers/message-updated-publisher';

const router = express.Router();

router.put(
  `/api/discussion/messages/:messageId`,
  [body('messageText').not().isEmpty().withMessage('Title is required')],
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

    const createdAt = new Date();

    message.set({
      messageText: req.body.messageText,
      createdAt,
      status: MessageStatus.Updated,
    });

    await message.save();

    // Publish an event saying that a message was created
    new MessageUpdatedPublisher(natsWrapper.client).publish({
      id: message.id,
      version: message.version,
      userId: message.userId,
      sendTo: 'message.sendTo',
      createdAt: message.createdAt.toISOString(),
      messageText: message.messageText,
      status: message.status,
      annonce: {
        id: message.annonce.id,
        title: message.annonce.title,
        userId: message.annonce.userId,
      },
    });
    res.send(message);
  }
);

export { router as updatedMessageRouter };
