import { model, Schema } from 'mongoose';

const MarathonsSchema = new Schema(
  {
    startDate: Date,
    endDate: Date,
    name: String,
    planning: {
      type: Schema.Types.ObjectId,
      ref: 'Planning',
    },
  },
  {
    timestamps: true,
  }
);

const Marathon = model('Marathon', MarathonsSchema);

export default Marathon;
