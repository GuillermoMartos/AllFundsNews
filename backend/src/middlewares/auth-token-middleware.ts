import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../helpers/constants';
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
    req.body.tokenPayload = tokenPayload;
  } catch (err) {
    console.error(err);
    throw new CustomError('Not authorized', 401);
  }

  return next();
};
