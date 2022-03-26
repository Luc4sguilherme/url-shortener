import { Request, Response, NextFunction } from 'express';

import AuthService from '@src/services/auth';

import logger from '../logger';

interface AuthRequest extends Request {
  context?: {
    userId?: string;
  };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).send({ error: 'No token provided!' });
      return;
    }

    const parts = authHeader.split(' ');

    if (!(parts.length === 2)) {
      res.status(401).send({ error: 'Token error!' });
      return;
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).send({ error: 'Token malformatted!' });
      return;
    }

    const claims = AuthService.decodeToken(token as string);

    req.context = { userId: claims.sub };

    next();
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
    }

    res.status(500).send({ error: 'Error verifying token' });
  }
}
