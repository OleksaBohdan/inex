import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User.js';
import { IIncomeCategory } from './IncomeCategory.js';

export interface IIncomeTransaction extends Document {
  user: IUser['_id'];
  incomeCategory: IIncomeCategory['_id'];
  value: number;
  description: string;
  rang: number;
}

const IncomeTransactionSchema: Schema = new Schema<IIncomeTransaction>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    incomeCategory: { type: Schema.Types.ObjectId, ref: 'IncomeCategory', required: true },
    value: { type: Number, required: true },
    description: { type: String },
    rang: { type: Number, default: 0 },
  },
  { timestamps: true },
);

IncomeTransactionSchema.pre<IIncomeTransaction>('save', function (next) {
  if (this.description && this.description.length > 250) {
    this.description = this.description.substring(0, 247) + '...';
  }
  next();
});

export const IncomeTransaction = mongoose.model<IIncomeTransaction>('IncomeTransaction', IncomeTransactionSchema);
