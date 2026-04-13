import { Request, Response } from 'express';
import User from '../models/User';
import Transaction from '../models/Wallet';
import { AuthRequest } from '../middleware/authMiddleware';

export const getBalance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    res.json({
      userId: user._id,
      balance: user.balance,
      bonusBalance: user.bonusBalance,
      totalBalance: user.balance + user.bonusBalance,
    });
  } catch (error) {
    console.error('Error al obtener balance:', error);
    res.status(500).json({ message: 'Error al obtener balance', error });
  }
};

export const deposit = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId, amount, paymentMethod } = req.body;

    if (amount <= 0) {
      res.status(400).json({ message: 'El monto debe ser mayor a 0' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // Aquí iría integración con gateway de pago (Stripe, PayPal, etc.)
    user.balance += amount;
    await user.save();

    const transaction = new Transaction({
      userId,
      type: 'deposit',
      amount,
      description: 'Depósito de fondos',
      status: 'completed',
      paymentMethod,
    });
    await transaction.save();

    res.json({
      message: 'Depósito realizado exitosamente',
      transaction,
      newBalance: user.balance,
    });
  } catch (error) {
    console.error('Error en depósito:', error);
    res.status(500).json({ message: 'Error en depósito', error });
  }
};

export const withdraw = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId, amount } = req.body;

    if (amount <= 0) {
      res.status(400).json({ message: 'El monto debe ser mayor a 0' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    if (user.balance < amount) {
      res.status(400).json({ message: 'Saldo insuficiente' });
      return;
    }

    user.balance -= amount;
    await user.save();

    const transaction = new Transaction({
      userId,
      type: 'withdrawal',
      amount,
      description: 'Retiro de fondos',
      status: 'pending',
    });
    await transaction.save();

    res.json({
      message: 'Solicitud de retiro enviada',
      transaction,
      newBalance: user.balance,
    });
  } catch (error) {
    console.error('Error en retiro:', error);
    res.status(500).json({ message: 'Error en retiro', error });
  }
};

export const getTransactions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit as string) || 20;
    const page = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * limit;

    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Transaction.countDocuments({ userId });

    res.json({
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      transactions,
    });
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    res.status(500).json({ message: 'Error al obtener transacciones', error });
  }
};
