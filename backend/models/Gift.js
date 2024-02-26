import { model, Schema } from 'mongoose';

const giftsSchema = new Schema(
  {
    quantity: Number,
    image: {
      originalname: String,
      size: String,
      format: String,
      url: String,
    },
    es: {
      name: String,
      description: String,
    },
    ca: {
      name: String,
      description: String,
    },
  },
  {
    timestamps: true,
  }
);

const Gift = model('Gift', giftsSchema);

export default Gift;
