import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  userId: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'bonus' | 'refund';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  reference?: string;
  paymentMethod?: string;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  userId: { 
    type: String, 
    required: true,
    index: true,
  },
  type: { 
    type: String, 
    enum: ['deposit', 'withdrawal', 'bet', 'win', 'bonus', 'refund'], 
    required: true,
    index: true,
  },
  amount: { 
    type: Number, 
    required: true,
    min: 0,
  },
  description: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed', 'cancelled'], 
    default: 'pending',
    index: true,
  },
  reference: { type: String },
  paymentMethod: { type: String },
  createdAt: { 
    type: Date, 
    default: Date.now,
    index: true,
  },
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
