import { MessageCreatedEvent, Publisher, Subjects } from '@worth-it/common';

export class MessageCreatedPublisher extends Publisher<MessageCreatedEvent> {
  subject: Subjects.MessageCreated = Subjects.MessageCreated;
}
