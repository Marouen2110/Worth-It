import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { AnnonceLB } from '../../models/annonceLB';
import { GetQuery } from '../../models/queryPrice3Idealo';
import { exemple } from '../../services/exemple';
import { api3PriceExp } from '../../services/exempleAPI3Price';

it('returns list of specific offers from idealo', async () => {
  const annonceLB = AnnonceLB.build(exemple);
  await annonceLB.save();
  // console.log(annonceLB);

  const apiRequest = GetQuery.build(api3PriceExp);
  await apiRequest.save();
  // console.log(apiRequest);

  // console.log(apiRequest.results[0].content[0].offers);

  const searchTerm = 'perceuse';

  // const apiRequestByTerm = await GetQuery.find({
  //   'results.0.query.value': searchTerm,
  // });

  // const apiResponceForSearchTag = await GetQuery.findOne({
  //   job_id: apiRequest.job_id,
  // });

  // console.log(apiResponceForSearchTag);

  const response = await request(app)
    .get(`/api/wi/tag/${searchTerm}`)
    .send()
    .expect(200);

  // expect(response.body[0].)
  expect(response.body.length).toEqual(
    apiRequest.results[0].content[0].offers_count
  );
  // console.log(apiRequest.results[0]);
  expect(apiRequest.results[0].query.value).toEqual(searchTerm);
});
