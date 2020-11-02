import { Subjects, Publisher, PaymentCreatedEvent } from '@worth-it/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
