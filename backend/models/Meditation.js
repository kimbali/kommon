import { Schema, model } from 'mongoose';

const meditationSchema = new Schema(
  {
    title: String,
    description: String,
    minutes: Number,
    image: {
      originalName: String,
      size: String,
      type: String,
      url: String,
    },
    link: String,
    level: String,
  },
  {
    timestamps: true,
  }
);

const Meditation = model('Meditation', meditationSchema);

export default Meditation;
