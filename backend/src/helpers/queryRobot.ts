import { User } from '../models/user';
import {
  getArchivedNewsRepository,
  getUserHistoryRepository,
} from '../repository';
import { addUserToCache, getNewFromCache, getUserFromCache } from './cache';
import { MESSAGGES } from './constants';
import {
  CustomError,
  isDateBetweenRange,
  pickNewStrategyAndReturnArray,
} from './helpers';
import { APINew, RangesOfInterest, UserData } from './types';

export async function getUserCachedOrDBHistory(userId: string): Promise<any> {
  if (!userId) {
    throw new CustomError(MESSAGGES.missingUserIdRequestParamsError, 422);
  }
  const cachedUser = getUserFromCache(userId);
  if (!cachedUser) {
    const userHistoryAndNews = await getUserHistoryRepository(userId);
    return userHistoryAndNews;
  }
  const changedStrategyUserArray = pickNewStrategyAndReturnArray(
    cachedUser?.searchStrategy as string[],
  );
  addUserToCache(cachedUser.id, {
    ...cachedUser,
    searchStrategy: changedStrategyUserArray,
  });
  return cachedUser;
}

export async function getArchivedNews(userData: UserData) {
  const cachedArticlesCollected = [];
  const newsToCollect = [];
  for (const articleId of userData.archivedNewsIds) {
    const articleFound = getNewFromCache(articleId);
    if (articleFound) {
      cachedArticlesCollected.push(articleFound);
    } else {
      newsToCollect.push(articleId);
    }
  }
  if (newsToCollect.length === 0) {
    return cachedArticlesCollected;
  } else {
    const DBCollectedNews = await getArchivedNewsRepository(newsToCollect);
    return [...cachedArticlesCollected, ...DBCollectedNews];
  }
}

export async function filterFiftyArticlesByUserPreferences(
  articlesFetched: APINew[],
  userId: string,
) {
  const user = await User.findOne({
    _id: userId,
  });
  if (!user) {
    console.error(': userId ', userId);
    throw new CustomError(MESSAGGES.unexpectedError, 500);
  }
  const outOfUserRangeFreshNews = [];
  const inRangeNewsToFilter: string[] = [];
  let notComparedArticles = 0;
  let comparedArticles = 0;
  for (const fetchedArticle of articlesFetched) {
    //first rule of algorithm: if article fetched is out of user range of "posible prohibitions", it's ok to show it
    if (
      isDateBetweenRange(
        new Date(fetchedArticle.published),
        user.userRangeOfInterestDate as RangesOfInterest,
      )
    ) {
      comparedArticles += 1;
      /* second rule of algorithm, indexed and binary seacrch performed by mongo under mongoose 
      (otherwise, we would make a binary tree to keep ordered ids and perform faster comparition) */
      inRangeNewsToFilter.push(fetchedArticle.id);
    } else {
      notComparedArticles += 1;
      outOfUserRangeFreshNews.push(fetchedArticle);
    }
  }

  console.log(
    `[RESULTADO AHORRO COMPARACIÓN]: Noticias comparadas: ${comparedArticles}, Noticias no comparadas: ${notComparedArticles}`,
  );

  if (inRangeNewsToFilter.length > 0) {
    // to do: Set!
    const archivedMatches = user.archivedNewsIds.filter((id: string) =>
      inRangeNewsToFilter.includes(id),
    );
    const deletedMatches = user.deletedNewsIds.filter((id: string) =>
      inRangeNewsToFilter.includes(id),
    );
    const conjunctedMatchingFilteredNews =
      archivedMatches.concat(deletedMatches);
    const filteredFreshNewsInRange = inRangeNewsToFilter.filter(
      (id) => !conjunctedMatchingFilteredNews.includes(id),
    );
    return [...outOfUserRangeFreshNews, ...filteredFreshNewsInRange];
  }

  return outOfUserRangeFreshNews;
}
