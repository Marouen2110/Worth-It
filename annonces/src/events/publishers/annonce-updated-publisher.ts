import { Publisher, Subjects, AnnonceUpdatedEvent } from '@worth-it/common';

export class AnnonceUpdatedPublisher extends Publisher<AnnonceUpdatedEvent> {
  subject: Subjects.AnnonceUpdated = Subjects.AnnonceUpdated;
}
