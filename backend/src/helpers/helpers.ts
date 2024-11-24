import { SHA3 } from 'crypto-js';
import { APINew, ModelNew, RangesOfInterest } from './types';
import {
  API_NEWS_TOKEN,
  categoriesNews,
  searchStrategiesURLS,
} from '../helpers/constants';

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export function normalizeAPINew(APIArticle: APINew): ModelNew {
  const normalizedNew: ModelNew = {
    author: APIArticle.author,
    description: APIArticle.description.slice(0, 20) + '...',
    _id: APIArticle.id,
    date: new Date(APIArticle.published),
    title: APIArticle.title,
    content: APIArticle.description,
    photo: APIArticle.image,
  };

  return normalizedNew;
}

function matchStrategyWithURL(strategy: string): string {
  switch (strategy) {
    case categoriesNews.academia:
      return searchStrategiesURLS[categoriesNews.academia];
    case categoriesNews.business:
      return searchStrategiesURLS[categoriesNews.business];
    case categoriesNews.entertainment:
      return searchStrategiesURLS[categoriesNews.entertainment];
    case categoriesNews.finance:
      return searchStrategiesURLS[categoriesNews.finance];
    case categoriesNews.food:
      return searchStrategiesURLS[categoriesNews.food];
    case categoriesNews.game:
      return searchStrategiesURLS[categoriesNews.game];
    case categoriesNews.general:
      return searchStrategiesURLS[categoriesNews.general];
    case categoriesNews.health:
      return searchStrategiesURLS[categoriesNews.health];
    case categoriesNews.latest:
      return searchStrategiesURLS[categoriesNews.latest];
    case categoriesNews.lifestyle:
      return searchStrategiesURLS[categoriesNews.lifestyle];
    case categoriesNews.opinion:
      return searchStrategiesURLS[categoriesNews.opinion];
    case categoriesNews.politics:
      return searchStrategiesURLS[categoriesNews.politics];
    case categoriesNews.programming:
      return searchStrategiesURLS[categoriesNews.programming];
    case categoriesNews.regional:
      return searchStrategiesURLS[categoriesNews.regional];
    case categoriesNews.science:
      return searchStrategiesURLS[categoriesNews.science];
    case categoriesNews.sports:
      return searchStrategiesURLS[categoriesNews.sports];
    case categoriesNews.technology:
      return searchStrategiesURLS[categoriesNews.technology];
    case categoriesNews.world:
      return searchStrategiesURLS[categoriesNews.world];
    case categoriesNews.latest:
      return searchStrategiesURLS.latest;
    default:
      throw new CustomError('No news category matches with URL', 500);
  }
}

export const fetchFiftyNewsByUserStrategy = async (
  strategy: string,
): Promise<APINew[]> => {
  try {
    const strategyURL = matchStrategyWithURL(strategy);
    const fiftyNewsByUserStrategy = await fetch(strategyURL, {
      headers: {
        Authorization: API_NEWS_TOKEN,
      },
    }).then((res) => res.json());

    return fiftyNewsByUserStrategy.news as APINew[];
  } catch (error) {
    throw error;
  }
};

export const pickNewStrategyAndReturnArray = (
  strategies: string[],
): string[] => {
  const firstStrategy = strategies.shift() as string;
  strategies.push(firstStrategy);
  return strategies;
};

export const encrypt = (data: any) => {
  let crypted = SHA3(data, {
    outputLength: 224,
  }).toString();
  return crypted;
};

export function isDateBetweenRange(
  dateToCheck: Date,
  datesRanges: RangesOfInterest,
) {
  if (
    datesRanges.lowestDateOfNew &&
    dateToCheck > datesRanges.lowestDateOfNew
  ) {
    if (
      datesRanges.highestDateOfNew &&
      dateToCheck < datesRanges.highestDateOfNew
    ) {
      return true;
    }
  }
  return false;
}
