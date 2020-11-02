import { BadRequestError, NotFoundError } from '@worth-it/common';
import express, { Request, Response } from 'express';
import { AnnonceLB } from '../models/annonceLB';
import { GetQuery } from '../models/queryPrice3Idealo';

const router = express.Router();

router.get('/api/wi/tag/:searchTerm', async (req: Request, res: Response) => {
  // const { annonceUrl } = req.params;
  const { searchTerm } = req.params;
  const categoryAuth = 'Bricolage';
  let categoryIsAuth = false;

  // const annonceLB = await AnnonceLB.find({ siteUrl: annonceUrl });

  // if (!annonceLB) {
  //   throw new NotFoundError();
  // }

  // if (annonceLB[0].data.categories[1].name === categoryAuth) {
  //   categoryIsAuth = true;
  // } else {
  //   throw new BadRequestError('Only Bricolage category is accepted');
  // }

  // const apiResponceForSearchTag = await GetQuery.findOne({ job_id });
  const apiRequestByTerm = await GetQuery.findOne({
    'results.0.query.value': searchTerm,
  });
  let offres = [];

  if (!apiRequestByTerm) {
    throw new BadRequestError(
      'It seems there is some problems! Please try again '
    );
  }

  res.send(apiRequestByTerm!.results[0].content[0].offers);
});

export { router as worthitTagRouter };
