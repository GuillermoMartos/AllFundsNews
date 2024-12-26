import { articleUrlsMap } from "../constants/api";
import { externalAPINew, internalAPINew } from "../types/article";
import { GET_APIWithToken, POST_APIWithToken } from "./helpers";

export const fetchFreshNews = async (
  userId: string,
  token: string,
): Promise<externalAPINew[]> => {
  const response: externalAPINew[] = await GET_APIWithToken(
    articleUrlsMap.ARTICLE_GET_NEWS_URL(userId),
    token,
  );
  return response;
};

export const archiveSelectedArticle = async (
  userId: string,
  token: string,
  fetchedArticle: externalAPINew,
): Promise<externalAPINew[]> => {
  const response: externalAPINew[] = await POST_APIWithToken(
    articleUrlsMap.ARTICLE_POST_ADD_ARCHIVE_URL(userId),
    token,
    { fetchedArticle },
  );
  return response;
};

export const fetchArchivedNews = async (
  userId: string,
  token: string,
): Promise<internalAPINew[]> => {
  const response: internalAPINew[] = await GET_APIWithToken(
    articleUrlsMap.ARTICLE_GET_ARCHIVED_URL(userId),
    token,
  );
  console.log('arch, res', response)
  return response;
};

export const deleteArchivedNewFromUser = async (
  userId: string,
  token: string,
  articleId: string,
): Promise<externalAPINew[]> => {
  const response: externalAPINew[] = await POST_APIWithToken(
    articleUrlsMap.ARTICLE_POST_DELETE_URL(userId),
    token,
    { articleId },
  );
  return response;
};
