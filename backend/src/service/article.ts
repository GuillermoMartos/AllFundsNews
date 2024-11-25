import { addNewToCache } from '../helpers/cache';
import { MESSAGGES } from '../helpers/constants';
import {
  CustomError,
  fetchFiftyNewsByUserStrategy,
  normalizeAPINew,
} from '../helpers/helpers';
import {
  filterFiftyArticlesByUserPreferences,
  getArchivedNews,
  getUserCachedOrDBHistory,
} from '../helpers/queryRobot';
import { APINew, ModelNew } from '../helpers/types';
import {
  deleteArchivedIdFromUserAndAddToDeletedIdRepository,
  saveNewArticleOrSetAsUserPrefered,
} from '../repository';

export const getFiftyFreshNewsService = async (userId: string) => {
  try {
    //servicio se encarga de la lógica: traer 50 noticias filtradas por usuario. Si no alcanzan, pedir nuevas con otra estrategia.
    const userData = await getUserCachedOrDBHistory(userId);
    const fiftyNews = await fetchFiftyNewsByUserStrategy(
      userData.searchStrategy.pop() as string,
    );

    const filteredFiftyNews = filterFiftyArticlesByUserPreferences(
      fiftyNews,
      userData.id,
    );

    return filteredFiftyNews;
  } catch (error) {
    throw error;
  }
};

export const getUserArchivedNewsService = async (userId: string) => {
  try {
    const userData = await getUserCachedOrDBHistory(userId);
    const userArchivedNews = await getArchivedNews(userData);

    return userArchivedNews;
  } catch (error) {
    throw error;
  }
};

export const saveNewInUserArchiveService = async (
  userId: string,
  fetchedArticle: APINew,
) => {
  try {
    if (!userId || !fetchedArticle) {
      throw new CustomError(
        MESSAGGES.missingNewArchiveCreateRequestParamsError,
        422,
      );
    }
    const normalizedArticle = normalizeAPINew(fetchedArticle);

    const savedArticle = await saveNewArticleOrSetAsUserPrefered(
      normalizedArticle,
      userId,
    );
    addNewToCache(savedArticle.id, savedArticle as unknown as ModelNew);
    return savedArticle;
  } catch (error) {
    throw error;
  }
};

export const deleteArticleForUserAndCheckDestructionService = async (
  userId: string,
  articleId: string,
) => {
  try {
    if (!userId || !articleId) {
      throw new CustomError(
        MESSAGGES.missingArticleDeletionRequestParamsError,
        422,
      );
    }
    await deleteArchivedIdFromUserAndAddToDeletedIdRepository(
      userId,
      articleId,
    );
    //con que logica va sobre el cahche?
  } catch (error) {
    throw error;
  }
};
