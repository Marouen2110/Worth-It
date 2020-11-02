import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { AnnonceDoc } from './annonce';
import { VotingStatus } from '@worth-it/common';

interface VotingAttrs {
  userId: string;
  status: VotingStatus;
  annonce: AnnonceDoc;
}

export interface VotingDoc extends mongoose.Document {
  userId: string;
  status: VotingStatus;
  version: number;
  annonce: AnnonceDoc;
}

interface VotingModel extends mongoose.Model<VotingDoc> {
  build(attrs: VotingAttrs): VotingDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<VotingDoc | null>;
}

const votingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(VotingStatus),
      default: VotingStatus.AwaitingVote,
    },
    annonce: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Annonce',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

votingSchema.set('versionKey', 'version');
votingSchema.plugin(updateIfCurrentPlugin);

votingSchema.statics.build = (attrs: VotingAttrs) => {
  return new Voting(attrs);
};

const Voting = mongoose.model<VotingDoc, VotingModel>('Voting', votingSchema);

export { Voting };
