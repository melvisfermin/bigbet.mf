import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token no proporcionado' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key') as any;
    req.userId = decoded.id;
    req.userEmail = decoded.email;

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token expirado' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Token inválido' });
    } else {
      res.status(401).json({ message: 'No autorizado', error });
    }
  }
};
