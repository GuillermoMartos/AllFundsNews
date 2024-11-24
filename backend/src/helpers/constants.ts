import 'dotenv/config';
export const DB_URI = process.env.DB_uri as string;
export const API_NEWS_TOKEN = process.env.NEWS_API_TOKEN as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;

const NEWS_API_BASE_URL = 'https://api.currentsapi.services/v1';
const URL_PATH_SPANISH_HUNDRED_NEWS = '?page_size=50';

export const MESSAGGES = {
  unexpectedError: 'Unexpected error, please retry',
  missingUserCreateRequestParamsError:
    'Some request body params missing: needed "email" and "password"',
  missingUserIdRequestParamsError: 'No userId found in query params',
  userEmailAlreadyExists: 'Email already in use for registered user',
  wrongUserCredentials: 'Wrong password or email submited',
  unexistingUserEmail: 'No user found with email ',
  userDoesNotMatchToken: 'User does not match token, retry login',
};

export const categoriesNews = {
  regional: 'regional',
  technology: 'technology',
  lifestyle: 'lifestyle',
  business: 'business',
  general: 'general',
  programming: 'programming',
  science: 'science',
  entertainment: 'entertainment',
  world: 'world',
  sports: 'sports',
  finance: 'finance',
  academia: 'academia',
  politics: 'politics',
  health: 'health',
  opinion: 'opinion',
  food: 'food',
  game: 'game',
  latest: 'latest',
};

export const userCategoriesNews = [
  categoriesNews.regional,
  categoriesNews.technology,
  categoriesNews.lifestyle,
  categoriesNews.business,
  categoriesNews.general,
  categoriesNews.programming,
  categoriesNews.science,
  categoriesNews.entertainment,
  categoriesNews.world,
  categoriesNews.sports,
  categoriesNews.finance,
  categoriesNews.academia,
  categoriesNews.politics,
  categoriesNews.health,
  categoriesNews.opinion,
  categoriesNews.food,
  categoriesNews.game,
  categoriesNews.latest,
];

export const searchStrategiesURLS = {
  [categoriesNews.regional]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.regional}`,
  [categoriesNews.technology]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.technology}`,
  [categoriesNews.lifestyle]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.lifestyle}`,
  [categoriesNews.business]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.business}`,
  [categoriesNews.general]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.general}`,
  [categoriesNews.programming]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.programming}`,
  [categoriesNews.science]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.science}`,
  [categoriesNews.entertainment]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.entertainment}`,
  [categoriesNews.world]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.world}`,
  [categoriesNews.finance]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.finance}`,
  [categoriesNews.academia]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.academia}`,
  [categoriesNews.politics]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.politics}`,
  [categoriesNews.health]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.health}`,
  [categoriesNews.opinion]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.opinion}`,
  [categoriesNews.sports]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.sports}`,
  [categoriesNews.food]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.food}`,
  [categoriesNews.game]: `${NEWS_API_BASE_URL}/search${URL_PATH_SPANISH_HUNDRED_NEWS}&category=${categoriesNews.game}`,
  [categoriesNews.latest]: `${NEWS_API_BASE_URL}/latest-news${URL_PATH_SPANISH_HUNDRED_NEWS}`,
};
