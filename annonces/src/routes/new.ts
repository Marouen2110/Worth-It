import { requireAuth, validateRequest } from '@worth-it/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { natsWrapper } from '../nats-wrapper';
import { AnnonceCreatedPublisher } from '../events/publishers/annonce-created-publisher';
import { Annonce } from '../models/annonce';

const router = express.Router();

router.post(
  '/api/annonces',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      title,
      description,
      image,
      adress,
      phone,
      price,
      shippingFee,
      voteCount,
    } = req.body;

    const annonce = Annonce.build({
      title,
      description,
      image,
      adress,
      phone,
      price,
      shippingFee,
      voteCount,
      userId: req.currentUser!.id,
    });

    await annonce.save();

    await new AnnonceCreatedPublisher(natsWrapper.client).publish({
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

    res.status(201).send(annonce);
  }
);

export { router as createAnnonceRouter };
