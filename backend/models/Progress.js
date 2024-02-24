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
    initialPhotos: {
      front: {
        originalName: String,
        size: String,
        format: String,
        url: String,
      },
      back: {
        originalName: String,
        size: String,
        format: String,
        url: String,
      },
      lateral: {
        originalName: String,
        size: String,
        format: String,
        url: String,
      },
    },
    photoFinish: {
      front: {
        originalName: String,
        size: String,
        format: String,
        url: String,
      },
      back: {
        originalName: String,
        size: String,
        format: String,
        url: String,
      },
      lateral: {
        originalName: String,
        size: String,
        format: String,
        url: String,
      },
    },
    weight: [
      {
        value: Number,
        date: Date,
      },
    ],
    chest: [
      {
        value: Number,
        date: Date,
      },
    ],
    waist: [
      {
        value: Number,
        date: Date,
      },
    ],
    buttocks: [
      {
        value: Number,
        date: Date,
      },
    ],
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
