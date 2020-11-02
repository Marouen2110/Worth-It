import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';
import { Annonce } from '../../models/annonce';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/annonces/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'visseuse perceuse bosch',
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
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/annonces/${id}`)
    .send({
      title: 'visseuse perceuse bosch',
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
    .expect(401);
});

it('returns a 401 if the user does not own the annonce', async () => {
  const response = await request(app)
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
      price: 130,
      shippingFee: 5,
      voteCount: 0,
    });

  await request(app)
    .put(`/api/annonces/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'visseuse perceuse bosch',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      price: 150,
      shippingFee: 5,
      voteCount: 0,
    })
    .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/annonces')
    .set('Cookie', cookie)
    .send({
      title: 'visseuse perceuse bosch',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      price: 130,
      shippingFee: 5,
      voteCount: 0,
    });

  await request(app)
    .put(`/api/annonces/${response.body.id}`)
    .set('Cookie', cookie)
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
    .put(`/api/annonces/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'visseuse perceuse bosch',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      shippingFee: 5,
      price: -10,
      voteCount: 0,
    })
    .expect(400);
});

it('updates the annonce provided valid inputs', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/annonces')
    .set('Cookie', cookie)
    .send({
      title: 'visseuse perceuse bosch',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      price: 130,
      shippingFee: 5,
      voteCount: 0,
    });

  await request(app)
    .put(`/api/annonces/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Perceuse bosch 18v',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      price: 140,
      shippingFee: 5,
      voteCount: 0,
    })
    .expect(200);

  const annonceResponse = await request(app)
    .get(`/api/annonces/${response.body.id}`)
    .send();

  expect(annonceResponse.body.title).toEqual('Perceuse bosch 18v');
  expect(annonceResponse.body.price).toEqual(140);
});

it('publishes an event', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/annonces')
    .set('Cookie', cookie)
    .send({
      title: 'visseuse perceuse bosch',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      price: 130,
      shippingFee: 5,
      voteCount: 0,
    });

  await request(app)
    .put(`/api/annonces/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Perceuse bosch 18v',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      price: 140,
      shippingFee: 5,
      voteCount: 0,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('rejects updates if the annonce is reserved', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/annonces')
    .set('Cookie', cookie)
    .send({
      title: 'visseuse perceuse bosch',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      price: 130,
      shippingFee: 5,
      voteCount: 0,
    });

  const annonce = await Annonce.findById(response.body.id);
  annonce!.set({ orderId: mongoose.Types.ObjectId().toHexString() });
  await annonce!.save();

  await request(app)
    .put(`/api/annonces/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Perceuse bosch 18v',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      price: 140,
      shippingFee: 5,
      voteCount: 0,
    })
    .expect(400);
});
