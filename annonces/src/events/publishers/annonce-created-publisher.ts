import { Publisher, Subjects, AnnonceCreatedEvent } from '@worth-it/common';

export class AnnonceCreatedPublisher extends Publisher<AnnonceCreatedEvent> {
  subject: Subjects.AnnonceCreated = Subjects.AnnonceCreated;
}
