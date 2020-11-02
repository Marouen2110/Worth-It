import { Message } from 'node-nats-streaming';
import { Subjects, Listener, AnnonceCreatedEvent } from '@worth-it/common';
import { queueGroupName } from './queue-group-name';
import { Annonce } from '../../models/annonce';

export class AnnonceCreatedListener extends Listener<AnnonceCreatedEvent> {
  subject: Subjects.AnnonceCreated = Subjects.AnnonceCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: AnnonceCreatedEvent['data'], msg: Message) {
    const { id, title, userId } = data;

    const annonce = Annonce.build({
      id,
      title,
      userId,
    });
    await annonce.save();

    msg.ack();
  }
}
