import { Response, Request, NextFunction } from 'express';
import { createNewUserService } from '../service/user';

export const createNewUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const userCreated = await createNewUserService(email, password);
    return res.status(200).json(userCreated);
  } catch (error) {
    next(error);
  }
};
