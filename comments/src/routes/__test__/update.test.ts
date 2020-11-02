import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';
import request from 'supertest';
import { app } from '../../app';

import { Annonce } from '../../models/annonce';

it('emits an advert(annonce) updated event', async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Perceuse Bosh 18v en bon état',
  });
  await annonce.save();

  const user = global.signin();

  const text = 'Bon Deal !!';
  // make a request to create an order
  const { body: comment } = await request(app)
    .post('/api/comments')
    .set('Cookie', user)
    .send({ annonceId: annonce.id, text })
    .expect(201);

  // make a request to update the order
  await request(app)
    .put(`/api/comments/${comment.id}`)
    .set('Cookie', user)
    .send({ text: 'Très Bon Deal' })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
