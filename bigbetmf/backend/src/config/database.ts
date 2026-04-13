import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bigbet-mf';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      retryWrites: true,
      w: 'majority',
    });
    console.log('✅ MongoDB conectado');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ Error en MongoDB:', error);
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB desconectado');
  } catch (error) {
    console.error('❌ Error desconectando MongoDB:', error);
    throw error;
  }
};
