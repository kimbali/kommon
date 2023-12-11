import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    isFullRegistered: Boolean,
    progresses: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Progress',
        },
      ],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    city: String,
    address: String,
    age: Number,
    weight: Number,
    height: Number,
    chest: Number,
    waist: Number,
    buttocks: Number,
    activity: String,
    porpuse: String,
    problems: String,
    patologies: [String],
    allergies: [String],
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt before save to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = model('User', userSchema);

export default User;
