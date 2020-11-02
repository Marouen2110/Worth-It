import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from '@worth-it/common';
import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Annonce } from '../../../models/annonce';

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create and save a ticket
  const annonce = Annonce.build({
    title: 'visseuse perceuse bosch',
    description:
      'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
    image:
      'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
    adress: 'Bobigny (93000)',
    phone: '0607080910',
    price: 130,
    shippingFee: 5,
    userId: 'asdf',
    voteCount: 0,
  });
  await annonce.save();

  // Create the fake data event
  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'alskdfj',
    expiresAt: 'alskdjf',
    annonce: {
      id: annonce.id,
      price: annonce.price,
      shippingFee: annonce.shippingFee,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, annonce, data, msg };
};

it('sets the userId of the advert', async () => {
  const { listener, annonce, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedAnnonce = await Annonce.findById(annonce.id);

  expect(updatedAnnonce!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
  const { listener, annonce, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('publishes an advert updated event', async () => {
  const { listener, annonce, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const annonceUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(annonceUpdatedData.orderId);
});
