import { Subjects, Publisher, OrderCancelledEvent } from '@worth-it/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
