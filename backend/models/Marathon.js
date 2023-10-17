import { model, Schema } from 'mongoose';

const MarathonsSchema = new Schema(
  {
    startDate: Date,
    endDate: Date,
    planning: any,
  },
  {
    timestamps: true,
  }
);

const Marathon = model('Marathon', MarathonsSchema);

export default Marathon;
