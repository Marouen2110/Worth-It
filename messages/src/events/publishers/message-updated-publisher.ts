import { MessageUpdatedEvent, Publisher, Subjects } from '@worth-it/common';

export class MessageUpdatedPublisher extends Publisher<MessageUpdatedEvent> {
  subject: Subjects.MessageUpdated = Subjects.MessageUpdated;
}
