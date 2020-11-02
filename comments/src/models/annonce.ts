import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface AnnonceAttrs {
  id: string;
  title: string;
}

export interface AnnonceDoc extends mongoose.Document {
  title: string;
  version: number;
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
  });
};

const Annonce = mongoose.model<AnnonceDoc, AnnonceModel>(
  'Annonce',
  annonceSchema
);

export { Annonce };
