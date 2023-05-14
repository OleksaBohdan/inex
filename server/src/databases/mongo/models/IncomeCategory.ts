import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User.js';

export interface IIncomeCategory extends Document {
  user: IUser['_id'];
  name: string;
}

const IncomeCategorySchema: Schema = new Schema<IIncomeCategory>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const IncomeCategory = mongoose.model<IIncomeCategory>('IncomeCategory', IncomeCategorySchema);
