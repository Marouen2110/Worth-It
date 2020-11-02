import request from 'supertest';
import { app } from '../../app';
import { Annonce } from '../../models/annonce';
import { Comment } from '../../models/comment';
import { natsWrapper } from '../../nats-wrapper';
import mongoose from 'mongoose';

it('has a route handler linstening to api/comments for post requests', async () => {
  const response = await request(app).post('/api/comments').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/comments').send({}).expect(401);
});

it('returns an error if the advert(annonce) does not exist', async () => {
  const annonceId = mongoose.Types.ObjectId();

  await request(app)
    .post('api/comments')
    .set('Cookie', global.signin())
    .send({ annonceId })
    .expect(404);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/comments')
    .set('Cookie', global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid content is provided', async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Perceuse Bosh 18v en bon état',
  });
  await annonce.save();

  await request(app)
    .post('/api/comments')
    .set('Cookie', global.signin())
    .send({
      annonceId: annonce.id,
      text: '',
    })
    .expect(400);
});

it('it create an advert (annonce)', async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Perceuse Bosh 18v en bon état',
  });
  await annonce.save();

  const response = await request(app)
    .post('/api/comments')
    .set('Cookie', global.signin())
    .send({
      annonceId: annonce.id,
      text: 'Bon Deal',
    })
    .expect(201);
});

it('publishes an event', async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Perceuse Bosh 18v en bon état',
  });
  await annonce.save();

  const text = 'asldkfj';

  await request(app)
    .post('/api/comments')
    .set('Cookie', global.signin())
    .send({
      annonceId: annonce.id,
      text,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
