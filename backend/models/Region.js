import { Schema, model } from 'mongoose';

const regionSchema = new Schema(
  {
    region: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);

const Region = model('Region', regionSchema);

export default Region;
