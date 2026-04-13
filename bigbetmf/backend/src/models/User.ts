import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  birthDate?: Date;
  country?: string;
  balance: number;
  bonusBalance: number;
  verified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 3,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6,
  },
  phone: { type: String },
  birthDate: { type: Date },
  country: { type: String },
  balance: { 
    type: Number, 
    default: 0,
    min: 0,
  },
  bonusBalance: { 
    type: Number, 
    default: 10,
    min: 0,
  },
  verified: { 
    type: Boolean, 
    default: false 
  },
  lastLogin: { type: Date },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Index para búsquedas rápidas
UserSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', UserSchema);
