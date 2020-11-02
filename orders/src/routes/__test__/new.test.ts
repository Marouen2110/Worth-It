import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Annonce } from '../../models/annonce';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

it('returns an error if the advert does not exist', async () => {
  const annonceId = mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ annonceId })
    .expect(404);
});

it('returns an error if the advert is already reserved', async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'perceuse',
    price: 120,
    shippingFee: 5,
  });
  await annonce.save();
  const order = Order.build({
    annonce,
    userId: 'laskdflkajsdf',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: annonce.id })
    .expect(400);
});

it('reserves a ticket', async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'perceuse',
    price: 120,
    shippingFee: 5,
  });
  await annonce.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ annonceId: annonce.id })
    .expect(201);
});

it('emits an order created event', async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'perceuse',
    price: 120,
    shippingFee: 5,
  });
  await annonce.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ annonceId: annonce.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
