import { MessageStatus } from '@worth-it/common';
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { AnnonceDoc } from './annonce';
import { DiscussionDoc } from './discussion';

interface MessageAttrs {
  userId: string;
  messageText: string;
  status: MessageStatus;
  createdAt: Date;
  annonce: AnnonceDoc;
  discussion: DiscussionDoc;
}

export interface MessageDoc extends mongoose.Document {
  userId: string;
  messageText: string;
  status: MessageStatus;
  createdAt: Date;
  annonce: AnnonceDoc;
  version: number;
  discussion: DiscussionDoc;
}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
}

const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    messageText: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(MessageStatus),
      default: MessageStatus.Created,
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
    },
    annonce: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Annonce',
    },
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discussion',
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

messageSchema.set('versionKey', 'version');
messageSchema.plugin(updateIfCurrentPlugin);

messageSchema.statics.build = (attrs: MessageAttrs) => {
  return new Message(attrs);
};

const Message = mongoose.model<MessageDoc, MessageModel>(
  'Message',
  messageSchema
);

export { Message };
