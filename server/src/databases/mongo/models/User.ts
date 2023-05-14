import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  isSubscribed: boolean;
  subscribeEnd: Date;
}

const emailRegexp = /^([\w-]+\.)*?[\w-]+@[\w-]+\.([\w-]+\.)*?[\w]+$/; // Simple email validation

const UserSchema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,

      match: [emailRegexp, 'Please fill a valid email address'],
    },
    passwordHash: { type: String, required: true },
    isSubscribed: { type: Boolean, required: true, default: false },
    subscribeEnd: { type: Date },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>('User', UserSchema);
