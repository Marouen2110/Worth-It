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

it('it increments vote counter by 2 ', async () => {
  const userOne = global.signin();
  const userTwo = global.signin();

  const annonce = await buildAnnonce();

  const { body } = await request(app)
    .post(`/api/vote/annonce/${annonce.id}/increment`)
    .set('Cookie', userTwo)
    .send({ annonceId: annonce.id })
    .expect(201);

  const res = await request(app)
    .post(`/api/vote/annonce/${annonce.id}/increment`)
    .set('Cookie', userOne)
    .send({ annonceId: annonce.id })
    .expect(201);

  expect(res.body.voteCount).toEqual(17);
  let votings = await Voting.find({});
  let annonces = await Annonce.find({});
  expect(annonces[0].voters.length).toEqual(2);
});

it('it decrement vote counter by 2 ', async () => {
  const userOne = global.signin();
  const userTwo = global.signin();

  const annonce = await buildAnnonce();

  const { body } = await request(app)
    .post(`/api/vote/annonce/${annonce.id}/decrement`)
    .set('Cookie', userTwo)
    .send({ annonceId: annonce.id })
    .expect(201);

  const res = await request(app)
    .post(`/api/vote/annonce/${annonce.id}/decrement`)
    .set('Cookie', userOne)
    .send({ annonceId: annonce.id })
    .expect(201);

  expect(res.body.voteCount).toEqual(13);
  let annonces = await Annonce.find({});
  expect(annonces[0].voters.length).toEqual(2);
});

it('it increments the vote counting by 1 then decrements by 1', async () => {
  const userOne = global.signin();
  const userTwo = global.signin();

  const annonce = await buildAnnonce();

  await request(app)
    .post(`/api/vote/annonce/${annonce.id}/increment`)
    .set('Cookie', userTwo)
    .send({ annonceId: annonce.id })
    .expect(201);

  const res = await request(app)
    .post(`/api/vote/annonce/${annonce.id}/decrement`)
    .set('Cookie', userOne)
    .send({ annonceId: annonce.id })
    .expect(201);

  expect(res.body.voteCount).toEqual(15);
  let annonces = await Annonce.find({});
  expect(annonces[0].voters.length).toEqual(2);
});

it('returns an error if the user try to increment the advert(annonce) two times', async () => {
  const annonce = await buildAnnonce();
  const userTwo = global.signin();

  await request(app)
    .post(`/api/vote/annonce/${annonce.id}/increment`)
    .set('Cookie', userTwo)
    .send({ annonceId: annonce.id })
    .expect(201);

  const { body } = await request(app)
    .post(`/api/vote/annonce/${annonce.id}/increment`)
    .set('Cookie', userTwo)
    .send({ annonceId: annonce.id })
    .expect(400);
});
