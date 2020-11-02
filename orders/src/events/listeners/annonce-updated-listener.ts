import { Message } from 'node-nats-streaming';
import { Subjects, Listener, AnnonceUpdatedEvent } from '@worth-it/common';
import { queueGroupName } from './queue-group-name';
import { Annonce } from '../../models/annonce';

export class AnnonceUpdatedListener extends Listener<AnnonceUpdatedEvent> {
  subject: Subjects.AnnonceUpdated = Subjects.AnnonceUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: AnnonceUpdatedEvent['data'], msg: Message) {
    const annonce = await Annonce.findByEvent(data);

    if (!annonce) {
      throw new Error('Advert not found');
    }

    const { title, price, shippingFee } = data;
    annonce.set({ title, price, shippingFee });
    await annonce.save();

    msg.ack();
  }
}
