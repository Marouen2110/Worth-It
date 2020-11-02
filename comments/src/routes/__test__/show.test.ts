import mongoose from 'mongoose';

import request from 'supertest';
import { app } from '../../app';
import { Annonce } from '../../models/annonce';

it('fetches the comment', async () => {
  // create an advert(annonce)
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Perceuse Bosh 18v en bon état',
  });
  await annonce.save();

  const user = global.signin();
  const text = 'Bon Deal !!';

  // make a request to build a comment with this advert(annonce)
  const { body: comment } = await request(app)
    .post('/api/comments')
    .set('Cookie', user)
    .send({ annonceId: annonce.id, text })
    .expect(201);

  // make request to fetch the comment
  const { body: fetchedComment } = await request(app)
    .get(`/api/comments/${comment.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);
  expect(fetchedComment.id).toEqual(comment.id);
});

it('returns an error if one user tries to fetch another users Comments', async () => {
  // create an advert(annonce)
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Perceuse Bosh 18v en bon état',
  });
  await annonce.save();

  const user = global.signin();
  const text = 'Bon Deal !!';

  // make a request to build a comment with this advert(annonce)
  const { body: comment } = await request(app)
    .post('/api/comments')
    .set('Cookie', user)
    .send({ annonceId: annonce.id, text })
    .expect(201);

  // make request to fetch the order
  await request(app)
    .get(`/api/comments/${comment.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(401);
});
