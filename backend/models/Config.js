import { model, Schema } from 'mongoose';

const ConfigSchema = new Schema(
  {
    activeMeditations: Boolean,
  },
  {
    timestamps: true,
  }
);

const Config = model('Config', ConfigSchema);

export default Config;
