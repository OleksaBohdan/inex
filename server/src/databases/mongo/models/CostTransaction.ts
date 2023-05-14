import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User.js';
import { ICostCategory } from './CostCategory.js';

export interface ICostTransaction extends Document {
  user: IUser['_id'];
  CostCategory: ICostCategory['_id'];
  value: number;
  description: string;
  rang: number;
}

const CostTransactionSchema: Schema = new Schema<ICostTransaction>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    CostCategory: { type: Schema.Types.ObjectId, ref: 'CostCategory', required: true },
    value: { type: Number, required: true },
    description: { type: String },
    rang: { type: Number, default: 0 },
  },
  { timestamps: true },
);

CostTransactionSchema.pre<ICostTransaction>('save', function (next) {
  if (this.description && this.description.length > 250) {
    this.description = this.description.substring(0, 247) + '...';
  }
  next();
});

export const CostTransaction = mongoose.model<ICostTransaction>('CostTransaction', CostTransactionSchema);
