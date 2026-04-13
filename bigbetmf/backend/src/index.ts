import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import betRoutes from './routes/betRoutes';
import walletRoutes from './routes/walletRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bigbet-mf';

// Middleware de seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// Middleware de parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      retryWrites: true,
      w: 'majority',
    });
    console.log('✅ MongoDB conectado correctamente');
  } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err);
    process.exit(1);
  }
};

connectDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/wallet', walletRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint no encontrado' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ 
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
});

export default app;
