import { Schema, model } from 'mongoose';

const meditationSchema = new Schema(
  {
    title: String,
    description: String,
    minutes: Number,
    image: {
      originalname: String,
      size: String,
      format: String,
      url: String,
    },
    audio: String,
  },
  {
    timestamps: true,
  }
);

const Meditation = model('Meditation', meditationSchema);

export default Meditation;
