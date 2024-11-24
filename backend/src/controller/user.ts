import { Response, Request, NextFunction } from 'express';
import { createNewUserService, loginUserService } from '../service/user';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../helpers/constants';

export const createNewUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const userCreated = await createNewUserService(email, password);

    const token = jwt.sign(userCreated.id, JWT_SECRET);
    res.setHeader('Authorization', token);

    return res.status(200).json(userCreated);
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const userCreated = await loginUserService(email, password);

    const token = jwt.sign(userCreated.id, JWT_SECRET);
    res.setHeader('Authorization', token);

    return res.status(200).json(userCreated);
  } catch (error) {
    next(error);
  }
};
