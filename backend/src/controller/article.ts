import { Response, Request, NextFunction } from 'express';
import { getHundredFreshNewsService } from '../service/article';

export const getHundredFreshNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const HundredFreshNews = await getHundredFreshNewsService(userId as string);
    return res.status(200).json(HundredFreshNews);
  } catch (error) {
    next(error);
  }
};
