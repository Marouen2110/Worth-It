import { MessageDeletedEvent, Publisher, Subjects } from '@worth-it/common';

export class MessageDeletedPublisher extends Publisher<MessageDeletedEvent> {
  subject: Subjects.MessageDeleted = Subjects.MessageDeleted;
}
