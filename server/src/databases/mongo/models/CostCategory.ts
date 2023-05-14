import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User.js';

export interface ICostCategory extends Document {
  user: IUser['_id'];
  name: string;
}

const CostCategorySchema: Schema = new Schema<ICostCategory>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const CostCategory = mongoose.model<ICostCategory>('CostCategory', CostCategorySchema);
