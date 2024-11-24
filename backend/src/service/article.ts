import { fetchFiftyNewsByUserStrategy } from '../helpers/helpers';
import {
  filterFiftyArticlesByUserPreferences,
  getArchivedNews,
  getUserCachedOrDBHistory,
} from '../helpers/queryRobot';

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
    const userArchivedNews = getArchivedNews(userData);

    return userArchivedNews;
  } catch (error) {
    throw error;
  }
};
