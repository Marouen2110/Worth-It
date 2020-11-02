import { MessageStatus } from '@worth-it/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Annonce, AnnonceDoc } from '../../models/annonce';
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

it('fetches adverts (annonces)  of which the user shows his interest by sending messages', async () => {
  const userOne = global.signin();

  const annonce1 = await buildAnnonce();
  const annonce2 = await buildAnnonce();
  const annonce3 = await buildAnnonce();

  const annonceId = annonce1.id;
  const messageText = 'Bonjour, perceuse encore disponible !!';
  const messageText2 = 'Bonjour, annonce encore dispo !!';
  const messageText3 = 'Bonjour, encore dispo !!';
  const messageText21 = 'Je suis très intéressé!';

  const { body: message } = await request(app)
    .post(`/api/messages/annonce/${annonceId}`)
    .set('Cookie', userOne)
    .send({ annonceId, messageText })
    .expect(201);

  const { body: messageannonce2 } = await request(app)
    .post(`/api/messages/annonce/${annonce2.id}`)
    .set('Cookie', userOne)
    .send({ annonceId: annonce2.id, messageText: messageText2 })
    .expect(201);

  const { body: messageannonce3 } = await request(app)
    .post(`/api/messages/annonce/${annonce3.id}`)
    .set('Cookie', userOne)
    .send({ annonceId: annonce3.id, messageText: messageText3 })
    .expect(201);

  const { body: message2 } = await request(app)
    .post(`/api/messages/annonce/${annonceId}`)
    .set('Cookie', userOne)
    .send({ annonceId, messageText: messageText21 })
    .expect(201);

  const { body: messagesUserOne } = await request(app)
    .get(`/api/messages/user`)
    .set('Cookie', userOne)
    .send()
    .expect(200);
  // console.log(messagesUserOne);

  expect(messagesUserOne.length).toEqual(3);
});
