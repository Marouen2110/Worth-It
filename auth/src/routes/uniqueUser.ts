import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@worth-it/common';

import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router();

router.post(
  '/api/users/uniqueemail',
  [body('email').isEmail().withMessage('Email must be valid')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    let emailUnique: boolean = true;
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser !== null) {
      emailUnique = false;
      throw new BadRequestError('Email is taken');
    }

    res.status(200).send({ emailUnique });
  }
);

export { router as emailUniqueRouter };
