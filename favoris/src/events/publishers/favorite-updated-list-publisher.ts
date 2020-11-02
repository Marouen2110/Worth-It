import { FavoriteUpdatedEvent, Publisher, Subjects } from '@worth-it/common';

export class FavoriteUpdatedPublisher extends Publisher<FavoriteUpdatedEvent> {
  subject: Subjects.FavoriteUpdated = Subjects.FavoriteUpdated;
}
