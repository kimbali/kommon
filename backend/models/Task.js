import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    checked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model('Task', taskSchema);

export default Task;
