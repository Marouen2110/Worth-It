import { Publisher, OrderCreatedEvent, Subjects } from '@worth-it/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
