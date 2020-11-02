import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@worth-it/common';
import { Annonce } from '../models/annonce';
import { AnnonceUpdatedPublisher } from '../events/publishers/annonce-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/annonces/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const annonce = await Annonce.findById(req.params.id);

    if (!annonce) {
      throw new NotFoundError();
    }

    if (annonce.orderId) {
      throw new BadRequestError('Cannot edit a reserved annonce');
    }

    if (annonce.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    annonce.set({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      adress: req.body.adress,
      phone: req.body.phone,
      price: req.body.price,
      shippingFee: req.body.shippingFee,
      voteCount: req.body.voteCount,
    });
    await annonce.save();

    new AnnonceUpdatedPublisher(natsWrapper.client).publish({
      id: annonce.id,
      title: annonce.title,
      description: annonce.description,
      image: annonce.image,
      adress: annonce.adress,
      phone: annonce.phone,
      price: annonce.price,
      shippingFee: annonce.shippingFee,
      voteCount: annonce.voteCount,
      version: annonce.version,
      userId: annonce.userId,
    });

    res.send(annonce);
  }
);

export { router as updateAnnonceRouter };
