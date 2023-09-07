import { Schema, model } from 'mongoose';

const userSchemma = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchemma);

export default User;
