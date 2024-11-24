import 'dotenv/config';
export const DB_URI = process.env.DB_uri as string;
export const API_NEWS_TOKEN = process.env.NEWS_API_TOKEN as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;

const NEWS_API_BASE_URL = 'https://api.currentsapi.services/v1'
const URL_PATH_SPANISH_HUNDRED_NEWS= '?language=es&page_size=100'

export const MESSAGGES = {
  unexpectedError: 'Unexpected error, please retry',
  missingUserCreateRequestParamsError:
    'Some request body params missing: needed "email" and "password"',
  missingUserIdRequestParamsError: 'No userId found in query params',
  wrongUserCredentials: 'Wrong password or email submited',
  unexistingUserEmail: 'No user found with email ',
};

const enum categoriesNews{
  'regional' =  'regional',
  'technology' =  'technology',
  'lifestyle' =  'lifestyle',
  'business' =  'business',
  'general' = 'general',
  'programming' =  'programming',
  'science' =  'science',
  'entertainment' =  'entertainment',
  'world' =  'world',
  'sports'= 'sports',
  'finance'= 'finance',
  'academia'= 'academia',
  'politics'= 'politics',
  'health'= 'health',
  'opinion'= 'opinion',
  'food'= 'food',
  'game'= 'game'
}

export const searchStrategies = [
   `${NEWS_API_BASE_URL}/latest-news${URL_PATH_SPANISH_HUNDRED_NEWS}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.regional}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.technology}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.lifestyle}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.business}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.general}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.programming}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.science}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.entertainment}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.world}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.finance}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.academia}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.politics}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.health}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.opinion}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.food}`,
   `${NEWS_API_BASE_URL}${URL_PATH_SPANISH_HUNDRED_NEWS}${categoriesNews.game}`,
]