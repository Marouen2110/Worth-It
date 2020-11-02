import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Order, OrderStatus } from './order';

interface AnnonceAttrs {
  id: string;
  title: string;
  price: number;
  shippingFee: number;
}

export interface AnnonceDoc extends mongoose.Document {
  title: string;
  price: number;
  shippingFee: number;
  version: number;
  isReserved(): Promise<boolean>;
}

interface AnnonceModel extends mongoose.Model<AnnonceDoc> {
  build(attrs: AnnonceAttrs): AnnonceDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<AnnonceDoc | null>;
}

const annonceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingFee: {
      type: Number,
      required: true,
      min: 0,
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

annonceSchema.set('versionKey', 'version');
annonceSchema.plugin(updateIfCurrentPlugin);

annonceSchema.statics.findByEvent = (event: {
  id: string;
  version: number;
}) => {
  return Annonce.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

annonceSchema.statics.build = (attrs: AnnonceAttrs) => {
  return new Annonce({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
    shippingFee: attrs.shippingFee,
  });
};
annonceSchema.methods.isReserved = async function () {
  // this === the advert document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

const Annonce = mongoose.model<AnnonceDoc, AnnonceModel>(
  'Annonce',
  annonceSchema
);

export { Annonce };
