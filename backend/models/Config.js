import { model, Schema } from 'mongoose';

const ConfigSchema = new Schema(
  {
    activeMeditations: Boolean,
    workoutsLevel: Boolean,
    landingConfig: [
      {
        lang: String,
        giftTitle: String,
        giftDescription: String,
        giftImage: {
          originalName: String,
          size: String,
          format: String,
          url: String,
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
