import express from 'express';
import {
  getBalance,
  deposit,
  withdraw,
  getTransactions,
} from '../controllers/walletController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/balance/:userId', authMiddleware, getBalance);
router.post('/deposit', authMiddleware, deposit);
router.post('/withdraw', authMiddleware, withdraw);
router.get('/transactions/:userId', authMiddleware, getTransactions);

export default router;
