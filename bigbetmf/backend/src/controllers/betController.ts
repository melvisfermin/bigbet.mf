import { Request, Response } from 'express';
import Bet from '../models/Bet';
import User from '../models/User';
import Transaction from '../models/Wallet';
import { AuthRequest } from '../middleware/authMiddleware';

export const placeBet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { eventId, eventName, betType, stake, odds, prediction } = req.body;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const stakeAmount = parseFloat(stake);
    if (stakeAmount <= 0) {
      res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
      return;
    }

    if (user.balance < stakeAmount) {
      res.status(400).json({ message: 'Saldo insuficiente' });
      return;
    }

    const potentialWinning = stakeAmount * parseFloat(odds);

    const newBet = new Bet({
      userId,
      eventId,
      eventName,
      betType,
      stake: stakeAmount,
      odds: parseFloat(odds),
      potentialWinning,
      prediction,
      status: 'pending',
    });

    await newBet.save();

    // Actualizar balance del usuario
    user.balance -= stakeAmount;
    await user.save();

    // Registrar transacción
    const transaction = new Transaction({
      userId,
      type: 'bet',
      amount: stakeAmount,
      description: `Apuesta en ${eventName}`,
      status: 'completed',
      reference: newBet._id,
    });
    await transaction.save();

    res.status(201).json({
      message: 'Apuesta colocada exitosamente',
      bet: newBet,
      userBalance: user.balance,
    });
  } catch (error) {
    console.error('Error al colocar apuesta:', error);
    res.status(500).json({ message: 'Error al colocar apuesta', error });
  }
};

export const getBetHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * limit;

    const bets = await Bet.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Bet.countDocuments({ userId });

    res.json({
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      bets,
    });
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ message: 'Error al obtener historial', error });
  }
};

export const getBetDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { betId } = req.params;

    const bet = await Bet.findById(betId);
    if (!bet) {
      res.status(404).json({ message: 'Apuesta no encontrada' });
      return;
    }

    res.json(bet);
  } catch (error) {
    console.error('Error al obtener detalles:', error);
    res.status(500).json({ message: 'Error al obtener detalles', error });
  }
};

export const settleBet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { betId, result } = req.body;

    if (!['won', 'lost', 'pushed'].includes(result)) {
      res.status(400).json({ message: 'Resultado inválido' });
      return;
    }

    const bet = await Bet.findById(betId);
    if (!bet) {
      res.status(404).json({ message: 'Apuesta no encontrada' });
      return;
    }

    bet.status = result;
    bet.result = result;
    bet.settledAt = new Date();

    if (result === 'won') {
      const user = await User.findById(bet.userId);
      if (user) {
        user.balance += bet.potentialWinning;
        await user.save();

        const transaction = new Transaction({
          userId: bet.userId,
          type: 'win',
          amount: bet.potentialWinning,
          description: `Ganancia de apuesta en ${bet.eventName}`,
          status: 'completed',
          reference: betId,
        });
        await transaction.save();
      }
    } else if (result === 'pushed') {
      const user = await User.findById(bet.userId);
      if (user) {
        user.balance += bet.stake;
        await user.save();

        const transaction = new Transaction({
          userId: bet.userId,
          type: 'refund',
          amount: bet.stake,
          description: `Devolución de apuesta (Push) en ${bet.eventName}`,
          status: 'completed',
          reference: betId,
        });
        await transaction.save();
      }
    }

    await bet.save();

    res.json({
      message: 'Apuesta resuelta',
      bet,
    });
  } catch (error) {
    console.error('Error al resolver apuesta:', error);
    res.status(500).json({ message: 'Error al resolver apuesta', error });
  }
};

export const cancelBet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { betId } = req.params;

    const bet = await Bet.findById(betId);
    if (!bet) {
      res.status(404).json({ message: 'Apuesta no encontrada' });
      return;
    }

    if (bet.status !== 'pending') {
      res.status(400).json({ message: 'Solo se pueden cancelar apuestas pendientes' });
      return;
    }

    const user = await User.findById(bet.userId);
    if (user) {
      user.balance += bet.stake;
      await user.save();

      const transaction = new Transaction({
        userId: bet.userId,
        type: 'refund',
        amount: bet.stake,
        description: `Cancelación de apuesta en ${bet.eventName}`,
        status: 'completed',
        reference: betId,
      });
      await transaction.save();
    }

    bet.status = 'cancelled';
    await bet.save();

    res.json({
      message: 'Apuesta cancelada',
      bet,
    });
  } catch (error) {
    console.error('Error al cancelar apuesta:', error);
    res.status(500).json({ message: 'Error al cancelar apuesta', error });
  }
};
