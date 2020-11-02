import {
  Publisher,
  Subjects,
  AnnonceVoteCountDecrementEvent,
} from '@worth-it/common';

export class AnnonceVoteDecrementPublisher extends Publisher<
  AnnonceVoteCountDecrementEvent
> {
  subject: Subjects.AnnonceVoteCountDecrement =
    Subjects.AnnonceVoteCountDecrement;
}
