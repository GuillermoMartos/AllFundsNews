import { Router } from 'express';
import userRouter from './user';
import articleRouter from './article';
import {
  errorHandlerMiddleware,
  requestLoggerMiddleware,
} from '../middlewares';

const router = Router();

router.use(requestLoggerMiddleware);
router.get('/api-ping', (req, res) => {
  res.send('ping');
});
router.use('/user', userRouter);
router.use('/article', articleRouter);
router.use(errorHandlerMiddleware);

export default router;
