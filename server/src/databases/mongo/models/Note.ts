import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User.js';

export interface INote extends Document {
  text: string;
  user: IUser['_id'];
}

const NoteSchema: Schema = new Schema<INote>(
  {
    text: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const Note = mongoose.model<INote>('Note', NoteSchema);
