import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';
import { Annonce } from '../../models/annonce';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler linstening to api/annonces for post requests', async () => {
  const response = await request(app).post('/api/annonces').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/annonces').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/annonces')
    .set('Cookie', global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/annonces')
    .set('Cookie', global.signin())
    .send({
      title: '',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      price: 130,
      shippingFee: 5,
      voteCount: 0,
    })
    .expect(400);

  await request(app)
    .post('/api/annonces')
    .set('Cookie', global.signin())
    .send({
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      price: 130,
      shippingFee: 5,
      voteCount: 0,
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/annonces')
    .set('Cookie', global.signin())
    .send({
      title: 'visseuse perceuse bosch',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      price: -130,
      shippingFee: 5,
      voteCount: 0,
    })
    .expect(400);

  await request(app)
    .post('/api/annonces')
    .set('Cookie', global.signin())
    .send({
      title: 'visseuse perceuse bosch',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      shippingFee: 5,
      voteCount: 0,
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  let tickets = await Annonce.find({});
  expect(tickets.length).toEqual(0);

  const title = 'visseuse perceuse bosch';
  const description =
    'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.';
  const image =
    'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg';
  const adress = 'Bobigny (93000)';
  const phone = '0607080910';
  const shippingFee = 5;
  const voteCount = 0;

  await request(app)
    .post('/api/annonces')
    .set('Cookie', global.signin())
    .send({
      title,
      description,
      image,
      adress,
      phone,
      price: 130,
      shippingFee,
      voteCount,
    })
    .expect(201);

  tickets = await Annonce.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(130);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].description).toEqual(description);
  expect(tickets[0].image).toEqual(image);
  expect(tickets[0].adress).toEqual(adress);
  expect(tickets[0].phone).toEqual(phone);
});

it('publishes an event', async () => {
  const title = 'Perceuse Bosh';
  const description =
    'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.';
  const image =
    'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg';
  const adress = 'Bobigny (93000)';
  const phone = '0607080910';
  const shippingFee = 5;
  const voteCount = 0;

  await request(app)
    .post('/api/annonces')
    .set('Cookie', global.signin())
    .send({
      title,
      description,
      image,
      adress,
      phone,
      price: 130,
      shippingFee,
      voteCount,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
