import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export interface OfferAttrs {
  id?: string;
  name: string;
  description: string;
  url: string;
  image: string;
  review_rating: number;
  review_count: number;
  offers_count: number;
  currency: string;
  min_price: number;
}

export interface OfferDoc extends mongoose.Document {
  name: string;
  description: string;
  url: string;
  image: string;
  review_rating: number;
  review_count: number;
  offers_count: number;
  currency: string;
  min_price: number;
  version?: number;
}

interface OfferModel extends mongoose.Model<OfferDoc> {
  build(attrs: OfferAttrs): OfferDoc;
}

const offerSchema = new mongoose.Schema(
  {
    name: {
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
    url: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    min_price: {
      type: Number,
      required: true,
    },
    offers_count: {
      type: Number,
      required: true,
    },
    review_rating: {
      type: Number,
      required: true,
    },
    review_count: {
      type: Number,
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

offerSchema.set('versionKey', 'version');
offerSchema.plugin(updateIfCurrentPlugin);

offerSchema.statics.build = (attrs: OfferAttrs) => {
  return new Offer(attrs);
};

const Offer = mongoose.model<OfferDoc, OfferModel>('Offer', offerSchema);

export { Offer };
