import { Publisher, CommentCreatedEvent, Subjects } from '@worth-it/common';
export class CommentCreatedPublisher extends Publisher<CommentCreatedEvent> {
  subject: Subjects.CommentCreated = Subjects.CommentCreated;
}
