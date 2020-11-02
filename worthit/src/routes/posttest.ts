import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { createJobId, TaskParams } from '../price3Api';

const router = express.Router();

router.post('/api/wi/offers/test', async (req: Request, res: Response) => {
  const { values } = req.body;

  console.log(values);

  res.send({ values });
});

export { router as postJobIdTestRouter };
