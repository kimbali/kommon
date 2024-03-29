import { model, Schema } from 'mongoose';

const ConfigSchema = new Schema(
  {
    price: Number,
    activeMeditations: Boolean,
    workoutsLevel: Boolean,
    vacuumVideo: String,
    waterTracker: {
      originalname: String,
      size: String,
      format: String,
      url: String,
    },
    landingConfig: [
      {
        lang: String,
        giftTitle: String,
        giftDescription: String,
        giftImage: {
          originalname: String,
          size: String,
          format: String,
          url: String,
        },
        resultName: String,
        resultDescription: String,
        resultImageBefore: {
          originalname: String,
          size: String,
          format: String,
          url: String,
        },
        resultImageAfter: {
          originalname: String,
          size: String,
          format: String,
          url: String,
        },
        coach: {
          default: [],
          type: [
            {
              name: String,
              comment: String,
              instagram: String,
              image: {
                originalname: String,
                size: String,
                format: String,
                url: String,
              },
            },
          ],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Config = model('Config', ConfigSchema);

export default Config;
