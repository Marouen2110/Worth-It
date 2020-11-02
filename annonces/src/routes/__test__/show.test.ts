import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';

it('returns a 404 if the ticket is not found', async () => {
  const id = mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/annonces/${id}`).send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const title = 'Persseuse Visseuse';
  const price = 120;
  const description =
    'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.';
  const image =
    'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg';
  const adress = 'Bobigny (93000)';
  const phone = '0607080910';
  const shippingFee = 5;
  const voteCount = 0;

  const response = await request(app)
    .post('/api/annonces')
    .set('Cookie', global.signin())
    .send({
      title,
      description,
      image,
      adress,
      phone,
      price,
      shippingFee,
      voteCount,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/annonces/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
