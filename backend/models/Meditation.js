import { Schema, model } from 'mongoose';

const meditationSchema = new Schema(
  {
    title: String,
    description: String,
    minutes: Number,
    image: String,
    link: String,
    level: String,
  },
  {
    timestamps: true,
  }
);

const Meditation = model('Meditation', meditationSchema);

export default Meditation;
