import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { AnnonceDoc } from './annonce';

interface FavoriteAttrs {
  userId: string;
  annonces?: Array<AnnonceDoc>;
}

interface FavoriteDoc extends mongoose.Document {
  userId: string;
  annonces?: Array<AnnonceDoc>;
  version: number;
}

interface FavoriteModel extends mongoose.Model<FavoriteDoc> {
  build(attrs: FavoriteAttrs): FavoriteDoc;
}

const favoviteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    annonces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Annonce',
      },
    ],
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

favoviteSchema.set('versionKey', 'version');
favoviteSchema.plugin(updateIfCurrentPlugin);

favoviteSchema.statics.build = (attrs: FavoriteAttrs) => {
  return new Favorite(attrs);
};

const Favorite = mongoose.model<FavoriteDoc, FavoriteModel>(
  'Favorite',
  favoviteSchema
);

export { Favorite };
