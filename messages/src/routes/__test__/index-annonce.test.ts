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

it('fetches messages for a particular user for a particular advert(annonce)', async () => {
  const userOne = global.signin();
  const userTwo = global.signin();

  const annonce = await buildAnnonce();
  const annonce2 = await buildAnnonce();
  const annonceId = annonce.id;
  const messageText = 'Bonjour, perceuse encore disponible !!';
  const messageText2 = 'Bonjour, annonce encore dispo !!';

  const { body: message } = await request(app)
    .post(`/api/messages/annonce/${annonceId}`)
    .set('Cookie', userOne)
    .send({ annonceId, messageText })
    .expect(201);

  const { body: message2 } = await request(app)
    .post(`/api/messages/annonce/${annonceId}`)
    .set('Cookie', userOne)
    .send({ annonceId, messageText: 'Si oui, je Vous propose 100€' })
    .expect(201);

  const { body: messageannonce2 } = await request(app)
    .post(`/api/messages/annonce/${annonce2.id}`)
    .set('Cookie', userOne)
    .send({ annonceId: annonce2.id, messageText: messageText2 })
    .expect(201);

  const { body: messagesUserOne } = await request(app)
    .get(`/api/messages/buyer/annonce/${annonceId}`)
    .set('Cookie', userOne)
    .send({ annonceId })
    .expect(200);

  const messages = await Message.find({});

  expect(messages.length).toEqual(3);
  expect(messagesUserOne.length).toEqual(2);
  expect(messagesUserOne[1].messageText).toEqual(
    'Si oui, je Vous propose 100€'
  );
});
