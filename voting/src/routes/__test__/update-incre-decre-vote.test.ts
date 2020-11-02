import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';
import { Annonce } from '../../models/annonce';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';
import { Voting } from '../../models/voting';

const buildAnnonce = async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'visseuse perceuse bosch',
    voteCount: 15,
    voters: [],
  });

  await annonce.save();

  return annonce;
};

it('it updates the vote counting by decrementing by 1  ', async () => {
  const userOne = global.signin();

  const annonce = await buildAnnonce();

  const { body } = await request(app)
    .post(`/api/vote/annonce/${annonce.id}/increment`)
    .set('Cookie', userOne)
    .send({ annonceId: annonce.id })
    .expect(201);

  let votings = await Voting.find({});
  const voting = votings[0];
  const res = await request(app)
    .put(`/api/vote/${voting.id}/annonce/${annonce.id}`)
    .set('Cookie', userOne)
    .send()
    .expect(201);

  expect(res.body.annonce.voteCount).toEqual(15);
  let annonces = await Annonce.find({});
  expect(annonces[0].voters.length).toEqual(1);
});

it('returns a 401 if the user does not own the vote ', async () => {
  const userOne = global.signin();
  const userTwo = global.signin();

  const annonce = await buildAnnonce();

  const { body } = await request(app)
    .post(`/api/vote/annonce/${annonce.id}/increment`)
    .set('Cookie', userOne)
    .send({ annonceId: annonce.id })
    .expect(201);

  let votings = await Voting.find({});
  const voting = votings[0];
  const res = await request(app)
    .put(`/api/vote/${voting.id}/annonce/${annonce.id}`)
    .set('Cookie', userTwo)
    .send()
    .expect(401);

  expect(body.voteCount).toEqual(16);
  let annonces = await Annonce.find({});
  expect(annonces[0].voters.length).toEqual(1);
});
