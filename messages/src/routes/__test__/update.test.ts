import { MessageStatus } from '@worth-it/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Annonce } from '../../models/annonce';
import { Message } from '../../models/message';
import { natsWrapper } from '../../nats-wrapper';

const userId = mongoose.Types.ObjectId().toHexString();

const buildAnnonce = async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'visseuse perceuse bosch',
    userId,
  });
  await annonce.save();

  return annonce;
};

it('updates a message to the seller and emits a message created event', async () => {
  const userOne = global.signin();
  const userTwo = global.signin();

  const annonce = await buildAnnonce();
  const annonceId = annonce.id;
  const messageText = 'Bonjuor, perceuse encore disponible !!';

  const { body } = await request(app)
    .post(`/api/messages/annonce/${annonceId}`)
    .set('Cookie', userOne)
    .send({ annonceId, messageText })
    .expect(201);

  const messageId = body.id;
  const messageTextUpdated = 'Bonjour, perceuse encore disponible !!';
  const { body: updated } = await request(app)
    .put(`/api/messages/${messageId}/annonce/${annonceId}`)
    .set('Cookie', userOne)
    .send({ annonceId, messageText: messageTextUpdated })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
  const messageUpdated = await Message.findById(updated.id);
  expect(messageUpdated?.status).toEqual(MessageStatus.Updated);
});

it('returns a 401 if the user does not own the message', async () => {
  const userOne = global.signin();
  const userTwo = global.signin();

  const annonce = await buildAnnonce();
  const annonceId = annonce.id;
  const messageText = 'Bonjuor, perceuse encore disponible !!';

  const { body } = await request(app)
    .post(`/api/messages/annonce/${annonceId}`)
    .set('Cookie', userOne)
    .send({ annonceId, messageText })
    .expect(201);

  const messageId = body.id;
  const messageTextUpdated = 'Bonjour, perceuse encore disponible !!';
  const { body: updated } = await request(app)
    .put(`/api/messages/${messageId}/annonce/${annonceId}`)
    .set('Cookie', userTwo)
    .send({ annonceId, messageText: messageTextUpdated })
    .expect(401);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
