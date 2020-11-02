import { Listener, OrderCancelledEvent, Subjects } from '@worth-it/common';
import { Message } from 'node-nats-streaming';
import { Annonce } from '../../models/annonce';
import { AnnonceUpdatedPublisher } from '../publishers/annonce-updated-publisher';
import { queueGroupName } from './queue-group-name';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    //TODO: Delete console.log
    console.log(data.annonce.id);
    const annonce = await Annonce.findById(data.annonce.id);

    if (!annonce) {
      throw new Error('Ticket not found');
    }

    annonce.set({ orderId: undefined });
    await annonce.save();
    await new AnnonceUpdatedPublisher(this.client).publish({
      id: annonce.id,
      orderId: annonce.orderId,
      userId: annonce.userId,
      price: annonce.price,
      title: annonce.title,
      description: annonce.description,
      image: annonce.image,
      adress: annonce.adress,
      phone: annonce.phone,
      shippingFee: annonce.shippingFee,
      version: annonce.version,
      voteCount: annonce.voteCount,
    });

    msg.ack();
  }
}
