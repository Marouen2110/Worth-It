import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@worth-it/common';
import { body } from 'express-validator';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { Annonce } from '../models/annonce';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  '/api/orders',
  requireAuth,
  [
    body('annonceId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('AnnonceId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { annonceId } = req.body;

    // Find the advert the user is trying to order in the database
    const annonce = await Annonce.findById(annonceId);
    if (!annonce) {
      throw new NotFoundError();
    }

    // Make sure that this advert is not already reserved
    // Run query to look at all orders.  Find an order where the advert
    // is the advert we just found *and* the orders status is *not* cancelled.
    // If we find an order from that means the advert *is* reserved
    const isReserved = await annonce.isReserved();
    if (isReserved) {
      throw new BadRequestError('Annonce is already reserved');
    }

    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build the order and save it to the database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      annonce,
    });
    await order.save();

    // Publish an event saying that an order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      annonce: {
        id: annonce.id,
        price: annonce.price,
        shippingFee: annonce.shippingFee,
      },
    });
    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
