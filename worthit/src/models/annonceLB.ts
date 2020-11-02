import { BoxBoolean } from 'aws-sdk/clients/licensemanager';
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export interface AnnonceLBAttrs {
  error: string | null;
  data: {
    title: string;
    description: string;
    image: string;
    price: number;
    shippingFees: number | null;
    currency: string;
    isInStock: boolean | null;
    EAN13: string | null;
    ASIN: string | null;
    ISBN: string | null;
    color: string | null;
    brand: string | null;
    category: {
      name: string;
      url: string;
    };
    categories: Array<{
      name: string;
      url: string;
    }>;
    siteURL: string;
    siteHtml: string | null;
    productHasVariations: string | null;
    error: string | null;
    statusCode: string | null;
    isFinished: string | null;
    isDead: string | null;
    htmlLength: number;
    captchaFound: boolean;
    isHtmlPage: boolean;
    host: string;
  };
}

export interface AnnonceLBADoc extends mongoose.Document {
  error: string | null;
  data: {
    title: string;
    description: string;
    image: string;
    price: number;
    shippingFees: number | null;
    currency: string;
    isInStock: boolean | null;
    EAN13: string | null;
    ASIN: string | null;
    ISBN: string | null;
    color: string | null;
    brand: string | null;
    category: {
      name: string;
      url: string;
    };
    categories: Array<{
      name: string;
      url: string;
    }>;
    siteURL: string;
    siteHtml: string | null;
    productHasVariations: string | null;
    error: string | null;
    statusCode: string | null;
    isFinished: string | null;
    isDead: string | null;
    htmlLength: number;
    captchaFound: boolean;
    isHtmlPage: boolean;
    host: string;
  };
  version?: number;
}

interface AnnonceLBModel extends mongoose.Model<AnnonceLBADoc> {
  build(attrs: AnnonceLBAttrs): AnnonceLBADoc;
}

const annoceLBSchema = new mongoose.Schema(
  {
    error: {
      type: String,
      default: null,
    },
    data: {
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
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      shippingFees: {
        type: Number,
        min: 0,
        default: null,
      },
      currency: {
        type: String,
        required: true,
      },
      isInStock: {
        type: Boolean,
        default: null,
      },
      EAN13: {
        type: String,
        default: null,
      },
      ASIN: {
        type: String,
        default: null,
      },
      ISBN: {
        type: String,
        default: null,
      },
      color: {
        type: String,
        default: null,
      },
      brand: {
        type: String,
        default: null,
      },
      category: {
        name: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      categories: [
        {
          name: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      ],
      siteURL: {
        type: String,
        required: true,
      },
      siteHtml: {
        type: String,
        default: null,
      },
      productHasVariations: {
        type: String,
        default: null,
      },
      error: {
        type: String,
        default: null,
      },
      statusCode: {
        type: String,
        default: null,
      },
      isFinished: {
        type: String,
        default: null,
      },
      isDead: {
        type: String,
        default: null,
      },
      htmlLength: {
        type: Number,
        min: 0,
      },
      captchaFound: {
        type: Boolean,
      },
      isHtmlPage: {
        type: Boolean,
      },
      host: {
        type: String,
        required: true,
      },
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

annoceLBSchema.set('versionKey', 'version');
annoceLBSchema.plugin(updateIfCurrentPlugin);

annoceLBSchema.statics.build = (attrs: AnnonceLBAttrs) => {
  return new AnnonceLB(attrs);
};

const AnnonceLB = mongoose.model<AnnonceLBADoc, AnnonceLBModel>(
  'AnnonceLB',
  annoceLBSchema
);

export { AnnonceLB };
