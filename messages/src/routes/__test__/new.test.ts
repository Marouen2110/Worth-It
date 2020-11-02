import { currentUser, DiscussionStatus } from '@worth-it/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Annonce } from '../../models/annonce';
import { Discussion } from '../../models/discussion';
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

console.log(currentUser);

const currentUserId = async (req: Request, res: Response) => {
  return req.currentUser().id;
};

const buildDiscussion = async (
  buyerId: string,
  sellerId: string,
  annonceId: string
) => {
  const disc = Discussion.build({
    buyerId,
    sellerId,
    annonceId,
    createdAt: new Date(),
    status: DiscussionStatus.Actif,
  });

  await disc.save();
  return disc;
};

it('sends a message to the seller and emits a message created event', async () => {
  const userOne = global.signin();
  const userTwo = global.signin();

  // const sellerId = currentUser.id;

  const annonce = await buildAnnonce();
  // const discussion = await buildDiscussion();
  const annonceId = annonce.id;
  const messageText = 'Bonjour, perceuse encore disponible !!';

  const { body } = await request(app)
    .post(`/api/messages/annonce/${annonceId}/`)
    .set('Cookie', userOne)
    .send({ annonceId, messageText })
    .expect(201);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
