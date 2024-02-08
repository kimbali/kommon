import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const progressSchema = new Schema(
  {
    marathon: {
      type: Schema.Types.ObjectId,
      ref: 'Marathon',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isPaid: Boolean,
    gift: String,
    initialPhoto: String,
    photoFinish: String,
    weight: [Number],
    height: [Number],
    chest: [Number],
    waist: [Number],
    buttocks: [Number],
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
    workouts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Workout',
      },
    ],
    meditations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Meditation',
      },
    ],
    tasksChecked: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tasks',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Progress = model('Progress', progressSchema);

export default Progress;
