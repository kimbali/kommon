import { model, Schema } from 'mongoose';

const MarathonsSchema = new Schema(
  {
    isActive: Boolean,
    startDate: Date,
    endDate: Date,
    name: String,
    active: Boolean,
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
