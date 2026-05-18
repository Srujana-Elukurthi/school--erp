import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { CustomError } from '../utils/customError';
import { Role } from '@prisma/client';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: Role;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError(401, 'Unauthorized: No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token) as { userId: string; role: Role };

    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      next(new CustomError(401, 'Unauthorized: Token expired'));
    } else {
      next(new CustomError(401, 'Unauthorized: Invalid token'));
    }
  }
};

export const authorize = (...roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new CustomError(403, 'Forbidden: Insufficient permissions'));
    }
    next();
  };
};
