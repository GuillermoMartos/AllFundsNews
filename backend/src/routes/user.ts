import { NextFunction, Request, Response, Router } from 'express';
import { createNewUserController } from '../controller/user';

const router = Router();

router.post(
  '/create',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      createNewUserController(req, res, next);
    } catch (err) {
      return next(err);
    }
  },
);

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //to do
    } catch (err) {
      return next(err);
    }
  },
);

export default router;
