import { CustomError } from '../helpers/helpers';
import { Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    console.error(`[ERROR INESPERADO]: ${err}`);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
