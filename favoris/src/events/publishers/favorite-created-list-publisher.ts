import { FavoriteCreatedEvent, Publisher, Subjects } from '@worth-it/common';

export class FavoriteCreatedPublisher extends Publisher<FavoriteCreatedEvent> {
  subject: Subjects.FavoriteCreated = Subjects.FavoriteCreated;
}
