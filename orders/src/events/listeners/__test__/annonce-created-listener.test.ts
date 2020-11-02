import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { AnnonceCreatedEvent } from '@worth-it/common';
import { AnnonceCreatedListener } from '../annonce-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Annonce } from '../../../models/annonce';

const setup = async () => {
  // create an instance of the listener
  const listener = new AnnonceCreatedListener(natsWrapper.client);

  // create a fake data event
  const data: AnnonceCreatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
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

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates and saves an advert', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure a ticket was created!
  const annonce = await Annonce.findById(data.id);

  expect(annonce).toBeDefined();
  expect(annonce!.title).toEqual(data.title);
  expect(annonce!.price).toEqual(data.price);
  expect(annonce!.shippingFee).toEqual(data.shippingFee);
});

it('acks the message', async () => {
  const { data, listener, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});
