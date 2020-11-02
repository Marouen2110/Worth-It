import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCancelledEvent } from '@worth-it/common';
import { OrderCancelledListener } from '../order-cancelled-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Annonce } from '../../../models/annonce';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = mongoose.Types.ObjectId().toHexString();
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
  annonce.set({ orderId });
  await annonce.save();

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    annonce: {
      id: annonce.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, annonce, orderId, listener };
};

it('updates the annonce, publishes an event, and acks the message', async () => {
  const { msg, data, annonce, orderId, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedAnnonce = await Annonce.findById(annonce.id);
  expect(updatedAnnonce!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
