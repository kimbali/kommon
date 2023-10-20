import { model, Schema } from 'mongoose';

const DaySchema = new Schema(
  {
    day: Date,
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
        ref: 'Workout',
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

export const Day = model('Day', DaySchema);

const PlanningsSchema = new Schema(
  {
    month: [
      {
        type: Schema.Types.ObjectId,
        ref: DaySchema,
      },
    ],
    name: String,
  },
  {
    timestamps: true,
  }
);

const Planning = model('Planning', PlanningsSchema);

export default Planning;
