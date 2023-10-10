import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
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

const Workout = model('Workout', workoutSchema);

export default Workout;
