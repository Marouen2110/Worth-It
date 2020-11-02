import mongoose from 'mongoose';

import request from 'supertest';
import { app } from '../../app';
import { Annonce } from '../../models/annonce';
import { Order } from '../../models/order';

const buildAnnonce = async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Perceuse',
    price: 120,
    shippingFee: 5,
  });
  await annonce.save();

  return annonce;
};

it('fetches orders for a particular user', async () => {
  // Create three tickets
  const annonceOne = await buildAnnonce();
  const annonceTwo = await buildAnnonce();
  const annonceThree = await buildAnnonce();

  const userOne = global.signin();
  const userTwo = global.signin();
  // Create one order as User #1
  await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ annonceId: annonceOne.id })
    .expect(201);

  // Create two orders as User #2
  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ annonceId: annonceTwo.id })
    .expect(201);
  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ annonceId: annonceThree.id })
    .expect(201);

  // Make request to get orders for User #2
  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)
    .expect(200);

  // Make sure we only got the orders for User #2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);
  expect(response.body[0].annonce.id).toEqual(annonceTwo.id);
  expect(response.body[1].annonce.id).toEqual(annonceThree.id);
});
