import {
  articleUrlsMap,
} from "../constants/api";
import { externalAPINew } from "../types/article";
import { GET_APIWithToken } from "./helpers";


export const fetchFreshNews = async(userId: string, token: string):Promise<externalAPINew[]> =>{
  const response: externalAPINew[] = await GET_APIWithToken(articleUrlsMap.ARTICLE_GET_NEWS_URL(userId), token)
  return response
}