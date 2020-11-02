import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { AnnonceUpdatedEvent } from '@worth-it/common';
import { AnnonceUpdatedListener } from '../annonce-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Annonce } from '../../../models/annonce';

const setup = async () => {
  // Create a listener
  const listener = new AnnonceUpdatedListener(natsWrapper.client);

  // Create and save a ticket
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    voteCount: 10,
    voters: [],
  });
  await annonce.save();

  // Create a fake data object
  const data: AnnonceUpdatedEvent['data'] = {
    id: annonce.id,
    version: annonce.version + 1,
    userId: 'ablskdjf',
    title: 'visseuse perceuse bosch',
    description:
      'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
    image:
      'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
    adress: 'Bobigny (93000)',
    phone: '0607080910',
    price: 130,
    shippingFee: 5,
    voteCount: 0,
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all of this stuff
  return { msg, data, annonce, listener };
};

it('finds, updates, and saves an advert', async () => {
  const { msg, data, annonce, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedAnnonce = await Annonce.findById(annonce.id);

  expect(updatedAnnonce!.title).toEqual(data.title);
  expect(updatedAnnonce!.version).toEqual(data.version);
});

it('acks the message', async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
  const { msg, data, listener, annonce } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
