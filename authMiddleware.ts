import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'Token missing' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token', error: err });
  }
};

export const authorizeRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user || !roles.includes(req.user.role)) {
        res.status(403).json({ message: 'Access denied' });
        return;
      }
      next();
    } catch (err) {
      res.status(500).json({ message: 'Authorization error', error: err });
    }
  };
};
