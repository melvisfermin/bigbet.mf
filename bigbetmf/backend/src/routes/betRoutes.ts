import express from 'express';
import { 
  placeBet, 
  getBetHistory, 
  getBetDetails, 
  settleBet, 
  cancelBet 
} from '../controllers/betController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/place', authMiddleware, placeBet);
router.get('/history/:userId', authMiddleware, getBetHistory);
router.get('/:betId', authMiddleware, getBetDetails);
router.put('/settle/:betId', authMiddleware, settleBet);
router.delete('/:betId', authMiddleware, cancelBet);

export default router;
