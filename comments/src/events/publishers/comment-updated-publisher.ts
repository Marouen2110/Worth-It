import { Publisher, Subjects, CommentUpdatedEvent } from '@worth-it/common';

export class CommentUpdatedPublisher extends Publisher<CommentUpdatedEvent> {
  subject: Subjects.CommentUpdated = Subjects.CommentUpdated;
}
