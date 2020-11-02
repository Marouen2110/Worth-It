import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface AnnonceAttrs {
  title: string;
  description: string;
  image: string;
  adress: string;
  phone: string;
  price: number;
  shippingFee: number;
  voteCount: number;
  userId: string;
}

export interface AnnonceDoc extends mongoose.Document {
  title: string;
  description: string;
  image: string;
  adress: string;
  phone: string;
  price: number;
  shippingFee: number;
  voteCount: number;
  userId: string;
  version: number;
}

interface AnnonceModel extends mongoose.Model<AnnonceDoc> {
  build(attrs: AnnonceAttrs): AnnonceDoc;
}

const annonceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    voteCount: {
      type: Number,
      required: true,
      default: 0,
    },
    userId: {
      type: String,
      required: true,
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

const index = { title: 'text' };
annonceSchema.index(index);

annonceSchema.set('versionKey', 'version');
annonceSchema.plugin(updateIfCurrentPlugin);

annonceSchema.statics.build = (attrs: AnnonceAttrs) => {
  return new Annonce(attrs);
};

const Annonce = mongoose.model<AnnonceDoc, AnnonceModel>(
  'Annonce',
  annonceSchema
);

export { Annonce };
