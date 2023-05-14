import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User.js';

export interface INote extends Document {
  user: IUser['_id'];
  text: string;
}

const NoteSchema: Schema = new Schema<INote>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String },
  },
  { timestamps: true },
);

export const Note = mongoose.model<INote>('Note', NoteSchema);
