import mongoose from 'mongoose';

import request from 'supertest';
import { app } from '../../app';
import { Annonce } from '../../models/annonce';

const buildAnnonce = async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Perceuse Bosh 18v en bon état',
  });
  await annonce.save();

  return annonce;
};

it('fetches comments for an particular user', async () => {
  // Create three adverts(annonces)
  const annonceOne = await buildAnnonce();
  const annonceTwo = await buildAnnonce();
  const annonceThree = await buildAnnonce();

  const userOne = global.signin();
  const userTwo = global.signin();

  const textUser1 = 'Bon Deal !!';
  const textUser2 = 'ça passe';
  const textUser2A3 = `non je passe, c'est trop chère`;

  // Create one comment as User #1
  await request(app)
    .post('/api/comments')
    .set('Cookie', userOne)
    .send({ annonceId: annonceOne.id, text: textUser1 })
    .expect(201);

  // Create one comment as User #2
  const { body: commentTwo } = await request(app)
    .post('/api/comments')
    .set('Cookie', userTwo)
    .send({ annonceId: annonceTwo.id, text: textUser2 })
    .expect(201);

  const { body: commentThree } = await request(app)
    .post('/api/comments')
    .set('Cookie', userTwo)
    .send({ annonceId: annonceThree.id, text: textUser2A3 })
    .expect(201);

  // Make request to get orders for User #2
  const response = await request(app)
    .get('/api/comments')
    .set('Cookie', userTwo)
    .expect(200);

  // Make sure we only got the comments for User #2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(commentTwo.id);
  expect(response.body[1].id).toEqual(commentThree.id);
  expect(response.body[0].annonce.id).toEqual(annonceTwo.id);
  expect(response.body[1].annonce.id).toEqual(annonceThree.id);
});
