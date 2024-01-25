import { model, Schema } from 'mongoose';

const DaySchema = new Schema(
  {
    week: Number,
    weekDay: Number,
    meals: [
      {
        diet: {
          type: Schema.Types.ObjectId,
          ref: 'Diet',
        },
        meal: String,
        recipe: {
          type: Schema.Types.ObjectId,
          ref: 'Recipe',
        },
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
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

export const Day = model('Day', DaySchema);

const PlanningsSchema = new Schema(
  {
    month: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Day',
      },
    ],
    name: String,
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

const Planning = model('Planning', PlanningsSchema);

export default Planning;
