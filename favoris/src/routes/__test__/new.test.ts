import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Annonce } from '../../models/annonce';
import { natsWrapper } from '../../nats-wrapper';

const buildAnnonce = async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'visseuse perceuse bosch',
  });
  await annonce.save();

  return annonce;
};

it('creates an advert(annonce) favorite list for a particular user', async () => {
  const { body } = await request(app)
    .post('/api/favorite/annonce')
    .set('Cookie', global.signin())
    .send()
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('throws an bad request error if the user tries to create a second advert favorite list ', async () => {
  const user = global.signin();

  const { body: firstFavoriteList } = await request(app)
    .post('/api/favorite/annonce')
    .set('Cookie', user)
    .send();

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const { body: secondFavoriteList } = await request(app)
    .post('/api/favorite/annonce')
    .set('Cookie', user)
    .send()
    .expect(400);
});
