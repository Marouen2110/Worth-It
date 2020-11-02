import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  BadRequestError,
  MessageStatus,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@worth-it/common';
import { body } from 'express-validator';
import { natsWrapper } from '../nats-wrapper';
import { Annonce } from '../models/annonce';
import { Message } from '../models/message';
import { MessageCreatedPublisher } from '../events/publishers/message-created-publisher';
import { Discussion } from '../models/discussion';

const router = express.Router();

router.post(
  `/api/discussion/:discussionId/messages/`,
  requireAuth,
  async (req: Request, res: Response) => {
    const { messageText } = req.body;

    const discussion = await Discussion.findById(req.params.discussionId);

    if (!discussion) {
      throw new NotFoundError();
    }

    // Find the advert the user is trying to send a message in the database
    const annonce = await Annonce.findById(discussion.annonceId);
    if (!annonce) {
      throw new NotFoundError();
    }
    const createdAt = new Date();

    const message = Message.build({
      userId: req.currentUser!.id,
      status: MessageStatus.Created,
      messageText,
      createdAt,
      annonce,
      discussion,
    });

    await message.save();

    // Publish an event saying that a message was created
    new MessageCreatedPublisher(natsWrapper.client).publish({
      id: message.id,
      version: message.version,
      userId: message.userId,
      sendTo: 'message.sendTo',
      createdAt: message.createdAt.toISOString(),
      messageText: message.messageText,
      status: message.status,
      annonce: {
        id: annonce.id,
        title: annonce.title,
        userId: annonce.userId,
      },
    });
    res.status(201).send(message);
  }
);

export { router as createdMessageRouter };
