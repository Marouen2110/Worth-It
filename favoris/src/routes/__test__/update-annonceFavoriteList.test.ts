import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Annonce } from '../../models/annonce';
import { Favorite } from '../../models/favorite';
import { natsWrapper } from '../../nats-wrapper';

const buildAnnonce = async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'visseuse perceuse bosch',
  });
  await annonce.save();

  return annonce;
};

it('adds a new adverts(annonces) for a particuliar user', async () => {
  const user = global.signin();

  const annonce1 = buildAnnonce();
  const annonceId1 = (await annonce1).id;
  const annonce2 = buildAnnonce();
  const annonceId2 = (await annonce2).id;
  const annonce3 = buildAnnonce();
  const annonceId3 = (await annonce3).id;

  const { body: FavoriteList } = await request(app)
    .post('/api/favorite/annonce')
    .set('Cookie', user)
    .send()
    .expect(201);

  await request(app)
    .put(`/api/favorite/annonce/${annonceId1}`)
    .set('Cookie', user)
    .send({ annonceId: annonceId1 })
    .expect(200);

  await request(app)
    .put(`/api/favorite/annonce/${annonceId2}`)
    .set('Cookie', user)
    .send({ annonceId: annonceId2 })
    .expect(200);

  const { body } = await request(app)
    .put(`/api/favorite/annonce/${annonceId3}`)
    .set('Cookie', user)
    .send({ annonceId: annonceId3 })
    .expect(200);

  // const favoriteList = await Favorite.find().populate('annonces');
  // console.log(favoriteList);
  // console.log(body.annonces);
  expect(body.annonces.length).toEqual(3);
});

it('removes a new adverts(annonces) for a particuliar user', async () => {
  const user = global.signin();

  const annonce1 = buildAnnonce();
  const annonceId1 = (await annonce1).id;
  const annonce2 = buildAnnonce();
  const annonceId2 = (await annonce2).id;
  const annonce3 = buildAnnonce();
  const annonceId3 = (await annonce3).id;

  const { body: FavoriteList } = await request(app)
    .post('/api/favorite/annonce')
    .set('Cookie', user)
    .send()
    .expect(201);

  await request(app)
    .put(`/api/favorite/annonce/${annonceId1}`)
    .set('Cookie', user)
    .send({ annonceId: annonceId1 })
    .expect(200);

  await request(app)
    .put(`/api/favorite/annonce/${annonceId2}`)
    .set('Cookie', user)
    .send({ annonceId: annonceId2 })
    .expect(200);

  await request(app)
    .put(`/api/favorite/annonce/${annonceId3}`)
    .set('Cookie', user)
    .send({ annonceId: annonceId3 })
    .expect(200);

  const { body } = await request(app)
    .delete(`/api/favorite/annonce/${annonceId2}`)
    .set('Cookie', user)
    .send({ annonceId: annonceId2 })
    .expect(200);

  // console.log(body.annonces);
  expect(body.annonces.length).toEqual(2);
});
