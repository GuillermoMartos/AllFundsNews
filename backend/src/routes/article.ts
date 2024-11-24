import { NextFunction, Request, Response, Router } from 'express';
import {
  getFiftyFreshNewsController,
  getUserArchivedNewsController,
  saveNewInUserArchiveController,
} from '../controller/article';
import { tokenValidationMiddleware } from '../middlewares';

const router = Router();

router.get(
  '/new/:userId',
  tokenValidationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getFiftyFreshNewsController(req, res, next);
    } catch (err) {
      return next(err);
    }
  },
);

router.get(
  '/archive/:userId',
  tokenValidationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getUserArchivedNewsController(req, res, next);
    } catch (err) {
      return next(err);
    }
  },
);

router.post(
  '/new/:userId',
  tokenValidationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      saveNewInUserArchiveController(req, res, next);
    } catch (err) {
      return next(err);
    }
  },
);

export default router;
