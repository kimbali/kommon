import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: String,
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isFullRegistered: Boolean,
    hasPaid: Boolean,
    createdByAdmin: Boolean,
    progresses: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Progress',
        },
      ],
      default: [],
    },
    name: String,
    phone: String,
    city: {
      type: Schema.Types.ObjectId,
      ref: 'Region',
    },
    address: String,
    age: Number,
    weight: Number,
    height: Number,
    chest: Number,
    waist: Number,
    buttocks: Number,
    activity: String,
    porpuse: String,
    breastfeed: String,
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
