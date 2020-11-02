import {
  AnnonceVoteCountUpdateEvent,
  Publisher,
  Subjects,
} from '@worth-it/common';

export class AnnonceVoteUpdatePublisher extends Publisher<
  AnnonceVoteCountUpdateEvent
> {
  subject: Subjects.AnnonceVoteCountUpdated = Subjects.AnnonceVoteCountUpdated;
}
