import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { OfferAttrs, OfferDoc } from './offer';

// export interface GetQueryAttrs {
//   job_id: string;
//   status: string;
//   results: [
//     {
//       success: boolean;
//       content: [Object];
//       query: [Object];
//       updated_at: Date;
//     }
//   ];
// }
export interface GetQueryAttrs {
  job_id: string;
  status: string;
  results: [
    {
      success: boolean;
      content: Array<{
        offers_count: number;
        offers: Array<OfferAttrs>;
      }>;
      query: {
        max_age: number;
        max_pages: number;
        value: string;
        key: string;
        country: string;
        topic: string;
        source: string;
      };
      updated_at: string;
    }
  ];
}

// export interface GetQueryDoc extends mongoose.Document {
//   job_id: string;
//   status: string;
//   results: [
//     {
//       success: boolean;
//       content: [Object];
//       query: [Object];
//       updated_at: Date;
//     }
//   ];
//   version: number;
// }
export interface GetQueryDoc extends mongoose.Document {
  job_id: string;
  status: string;
  results: [
    {
      success: boolean;
      content: Array<{
        offers_count: number;
        offers: Array<OfferDoc>;
      }>;
      query: {
        max_age: number;
        max_pages: number;
        value: string;
        key: string;
        country: string;
        topic: string;
        source: string;
      };
      updated_at: Date;
    }
  ];
  version: number;
}

interface GetQueryModel extends mongoose.Model<GetQueryDoc> {
  build(attrs: GetQueryAttrs): GetQueryDoc;
}

// const getQuerySchema = new mongoose.Schema(
//   {
//     job_id: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//     },
//     results: [
//       {
//         success: {
//           type: Boolean,
//           required: true,
//         },
//         content: [
//           {
//             type: Object,
//             required: true,
//           },
//         ],
//         query: [
//           {
//             type: Object,
//             required: true,
//           },
//         ],
//         updated_at: {
//           type: Date,
//         },
//       },
//     ],
//   },
//   {
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//       },
//     },
//   }
// );
const getQuerySchema = new mongoose.Schema(
  {
    job_id: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
    },
    results: [
      {
        success: {
          type: Boolean,
        },
        content: [
          {
            offers_count: {
              type: Number,
              min: 0,
            },
            offers: [
              {
                // type: mongoose.Schema.Types.ObjectId,
                type: Object,
                ref: 'Offer',
              },
            ],
          },
        ],
        query: {
          max_age: {
            type: Number,
          },
          max_pages: {
            type: Number,
          },
          value: {
            type: String,
          },
          key: {
            type: String,
          },
          country: {
            type: String,
          },
          topic: {
            type: String,
          },
          source: {
            type: String,
          },
        },

        updated_at: {
          type: Date,
        },
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

getQuerySchema.set('versionKey', 'version');
getQuerySchema.plugin(updateIfCurrentPlugin);

getQuerySchema.statics.build = (attrs: GetQueryAttrs) => {
  return new GetQuery(attrs);
};

const GetQuery = mongoose.model<GetQueryDoc, GetQueryModel>(
  'GetQuery',
  getQuerySchema
);

export { GetQuery };
