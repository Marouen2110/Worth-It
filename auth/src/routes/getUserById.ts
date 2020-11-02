import express, { Request, Response } from 'express';

import { User } from '../models/user';

const router = express.Router();

router.get('/api/users/:userId', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.userId);

  const email = user?.email;

  res.send({ email });
});

export { router as getUserByIdRouter };
