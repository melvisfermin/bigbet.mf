import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('birthDate').optional().isISO8601(),
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists(),
  ],
  login
);

export default router;
