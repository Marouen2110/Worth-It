import mongoose, { mongo } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { MessageDoc } from './message';
import { DiscussionStatus } from '@worth-it/common';

interface DiscussionAttrs {
  buyerId: string;
  sellerId: string;
  createdAt: Date;
  annonceId: string;
  status: DiscussionStatus;
}

export interface DiscussionDoc extends mongoose.Document {
  buyerId: string;
  sellerId: string;
  createdAt: Date;
  annonceId: string;
  status: DiscussionStatus;
  version: number;
}

interface DiscussionModel extends mongoose.Model<DiscussionDoc> {
  build(attrs: DiscussionAttrs): MessageDoc;
}

const discussionSchema = new mongoose.Schema(
  {
    buyerId: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    annonceId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(DiscussionStatus),
      default: DiscussionStatus.Actif,
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

discussionSchema.set('versionKey', 'version');
discussionSchema.plugin(updateIfCurrentPlugin);

discussionSchema.statics.build = (attrs: DiscussionAttrs) => {
  return new Discussion(attrs);
};

const Discussion = mongoose.model<DiscussionDoc, DiscussionModel>(
  'Discussion',
  discussionSchema
);

export { Discussion };
