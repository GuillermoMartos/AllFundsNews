import { Response, Request, NextFunction } from 'express';
import {
  getFiftyFreshNewsService,
  getUserArchivedNewsService,
  saveNewInUserArchiveService,
} from '../service/article';

export const getFiftyFreshNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const HundredFreshNews = await getFiftyFreshNewsService(userId);
    return res.status(200).json(HundredFreshNews);
  } catch (error) {
    next(error);
  }
};

export const getUserArchivedNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const userArchivedNews = await getUserArchivedNewsService(userId);

    return res.status(200).json(userArchivedNews);
  } catch (error) {
    next(error);
  }
};

export const saveNewInUserArchiveController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const { fetchedArticle } = req.body;
    const userArchivedNews = await saveNewInUserArchiveService(
      userId,
      fetchedArticle,
    );

    return res.status(200).json(userArchivedNews);
  } catch (error) {
    next(error);
  }
};
