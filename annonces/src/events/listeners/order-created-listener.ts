import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@worth-it/common';
import { queueGroupName } from './queue-group-name';
import { Annonce } from '../../models/annonce';
import { AnnonceUpdatedPublisher } from '../publishers/annonce-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the ticket that the order is reserving
    const annonce = await Annonce.findById(data.annonce.id);

    // If no ticket, throw error
    if (!annonce) {
      throw new Error('Annonce not found');
    }

    // Mark the ticket as being reserved by setting its orderId property
    annonce.set({ orderId: data.id });

    // Save the ticket
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
    // ack the message
    msg.ack();
  }
}
