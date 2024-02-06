import { model, Schema } from 'mongoose';

const ConfigSchema = new Schema(
  {
    activeMeditations: Boolean,
    workoutsLevel: Boolean,
  },
  {
    timestamps: true,
  }
);

const Config = model('Config', ConfigSchema);

export default Config;
