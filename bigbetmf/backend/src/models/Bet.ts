import mongoose, { Schema, Document } from 'mongoose';

export interface IBet extends Document {
  userId: string;
  eventId: string;
  eventName: string;
  betType: 'moneyline' | 'spread' | 'over_under' | 'parlay';
  stake: number;
  odds: number;
  potentialWinning: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled' | 'pushed';
  prediction: string;
  result?: string;
  createdAt: Date;
  settledAt?: Date;
}

const BetSchema = new Schema<IBet>({
  userId: { 
    type: String, 
    required: true,
    index: true,
  },
  eventId: { 
    type: String, 
    required: true 
  },
  eventName: { 
    type: String, 
    required: true 
  },
  betType: { 
    type: String, 
    enum: ['moneyline', 'spread', 'over_under', 'parlay'], 
    required: true 
  },
  stake: { 
    type: Number, 
    required: true,
    min: 0.01,
  },
  odds: { 
    type: Number, 
    required: true,
    min: 1,
  },
  potentialWinning: { 
    type: Number, 
    required: true,
    min: 0,
  },
  status: { 
    type: String, 
    enum: ['pending', 'won', 'lost', 'cancelled', 'pushed'], 
    default: 'pending',
    index: true,
  },
  prediction: { 
    type: String, 
    required: true 
  },
  result: { type: String },
  createdAt: { 
    type: Date, 
    default: Date.now,
    index: true,
  },
  settledAt: { type: Date },
});

export default mongoose.model<IBet>('Bet', BetSchema);
