import { NextFunction, Request, Response, Router } from 'express';
import { CustomError } from '../helpers/helpers';
import { getHundredFreshNewsController } from '../controller/article';
import { tokenValidationMiddleware } from '../middlewares';

const router = Router();

router.get(
  '/new/:userId',
  tokenValidationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getHundredFreshNewsController(req, res, next);
    } catch (err) {
      return next(err);
    }
  },
);

router.get(
  '/archive:userId',
  tokenValidationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next(new CustomError('mi error especial', 500));
    } catch (err) {
      return next(err);
    }
  },
);

router.post(
  '/archive',
  tokenValidationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next(new CustomError('mi error especial', 500));
    } catch (err) {
      return next(err);
    }
  },
);

export default router;
