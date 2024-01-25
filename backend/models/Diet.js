import { Schema, model } from 'mongoose';

const dietSchema = new Schema({
  name: String,
  isActive: String,
});

const Diet = model('Diet', dietSchema);

export default Diet;
