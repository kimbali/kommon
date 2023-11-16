import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: String,
    description: String,
    minutes: String,
    image: {
      originalName: String,
      size: String,
      type: String,
      url: String,
    },
    video: String,
    level: String,
  },
  {
    timestamps: true,
  }
);

const Workout = model('Workout', workoutSchema);

export default Workout;
