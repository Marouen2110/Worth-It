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

it('marks an order as deleted', async () => {
  const userOne = global.signin();
  const userTwo = global.signin();

  const annonce = await buildAnnonce();
  const annonceId = annonce.id;
  const messageText = 'Bonjuor, perceuse encore disponible !!';

  const { body: message } = await request(app)
    .post(`/api/messages/annonce/${annonceId}`)
    .set('Cookie', userOne)
    .send({ annonceId, messageText })
    .expect(201);

  await request(app)
    .delete(`/api/messages/${message.id}/annonce/${annonceId}`)
    .set('Cookie', userOne)
    .send({ messageId: message.id })
    .expect(204);

  const messageUpdated = await Message.findById(message.id);
  expect(messageUpdated?.status).toEqual(MessageStatus.Deleted);
});

it('emits a deleted message event', async () => {
  const userOne = global.signin();
  const userTwo = global.signin();

  const annonce = await buildAnnonce();
  const annonceId = annonce.id;
  const messageText = 'Bonjuor, perceuse encore disponible !!';

  const { body: message } = await request(app)
    .post(`/api/messages/annonce/${annonceId}`)
    .set('Cookie', userOne)
    .send({ annonceId, messageText })
    .expect(201);

  await request(app)
    .delete(`/api/messages/${message.id}/annonce/${annonceId}`)
    .set('Cookie', userOne)
    .send({ messageId: message.id })
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
