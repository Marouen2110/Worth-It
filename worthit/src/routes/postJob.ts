import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { createJobId, TaskParams } from '../price3Api';

const router = express.Router();

router.post('/api/wi/offers', async (req: Request, res: Response) => {
  const { values } = req.body;
  let jobId = '';

  const taskParams: TaskParams = {
    source: 'idealo',
    key: 'term',
    country: 'fr',
    values,
  };

  // const responsePost = await createJobId(taskParams)
  //   .then((resp) => {
  //     console.log(resp);
  //     //@ts-ignore
  //     jobId = resp.jobid;
  //     console.log(jobId);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const responsePost = await createJobId(taskParams);
  //@ts-ignore
  // console.log(result);
  // this.jobId = resp.jobid;

  const result = await responsePost.json();

  jobId = result.jobid;

  console.log(jobId);

  res.status(200).send({ jobId });
});
// const responsePost = await createJobId(values).then((resp) => {
//   console.log(resp);
//   // this.jobId = resp.jobid;
// });

export { router as postJobIdRouter };
