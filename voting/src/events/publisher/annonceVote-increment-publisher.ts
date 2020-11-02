import {
  Publisher,
  Subjects,
  AnnonceVoteCountIncrementEvent,
} from '@worth-it/common';

export class AnnonceVoteIncrementPublisher extends Publisher<
  AnnonceVoteCountIncrementEvent
> {
  subject: Subjects.AnnonceVoteCountIncrement =
    Subjects.AnnonceVoteCountIncrement;
}
