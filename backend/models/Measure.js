import { Schema, model } from 'mongoose';

const measureSchema = new Schema({
  name: String,
  diminutive: String,
});

const Measure = model('Measure', measureSchema);

export default Measure;
