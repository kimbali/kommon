import { model, Schema } from 'mongoose';
import Workout from './Workout';
import Task from './Task';

const daySchema = new Schema(
  {
    diets: [
      {
        dietKey: String,
        recipes: [
          {
            meal: String,
            recipe: {
              type: Schema.Types.ObjectId,
              ref: 'Recipe',
            },
          },
        ],
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
        ref: 'Workouts',
      },
    ],
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PlanningsSchema = new Schema(
  {
    month: [daySchema],
    name: String,
  },
  {
    timestamps: true,
  }
);

const Planning = model('Planning', PlanningsSchema);

export default Planning;
