import jwt from 'jsonwebtoken';
import { JWT_SECRET, MESSAGGES } from '../helpers/constants';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../helpers/helpers';

export const tokenValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token = req.headers.authorization;
  if (!token) {
    throw new CustomError('Not authorized', 401);
  }
  token = token.replace('Bearer ', '');
  try {
    const tokenPayload = jwt.verify(token, JWT_SECRET);
    const { userId } = req.params;
    if (tokenPayload !== userId) {
      throw new CustomError(MESSAGGES.userDoesNotMatchToken, 401);
    }
    req.body.tokenPayload = tokenPayload;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    console.error('[ERROR EN VALIDACIÓN TOKEN]', error);
    throw new CustomError('Not authorized', 401);
  }

  return next();
};
