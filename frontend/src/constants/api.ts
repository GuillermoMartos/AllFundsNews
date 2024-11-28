import { externalAPINew } from "../types/article";

const useDeployedServer = false
const BASE_API_URL = useDeployedServer ? "https://backend-martos-6bb3cc.onrender.com" : "http://localhost:3000"
const BASE_USER_API_URL = `${BASE_API_URL}/user`;
const BASE_ARTICLE_API_URL = `${BASE_API_URL}/article`;

const generatePathParamURL = (path: string, userId: string) => {
  return `${path}/${userId}`;
};

export const articleUrlsMap = {
  ARTICLE_GET_NEWS_URL:(userId: string)=> generatePathParamURL(`${BASE_ARTICLE_API_URL}/new`, userId),
  ARTICLE_GET_ARCHIVED_URL: (userId: string)=> generatePathParamURL(`${BASE_ARTICLE_API_URL}/archive`, userId),
  ARTICLE_POST_ADD_ARCHIVE_URL: (userId: string)=> generatePathParamURL(`${BASE_ARTICLE_API_URL}/new`, userId),
  ARTICLE_POST_DELETE_URL: (userId: string)=> generatePathParamURL(`${BASE_ARTICLE_API_URL}/article`, userId),
};

export const userUrlsMap = {
  USER_CREATE_URL: `${BASE_USER_API_URL}/create`,
  USER_LOGIN_URL: `${BASE_USER_API_URL}/login`
};

export interface createNewUserRequestBody {
  email: string;
  password: string;
}

export interface performUserLoguinRequestBody {
  email: string;
  password: string;
}

export interface performUserLoguinResponseBody {
  id: string;
  archivedNewsIds: string[];
  deletedNewsIds: string[];
  freshNews:externalAPINew[];
  token: string;
}

export interface fetchUserDataRequestBody {
  idUser: string | undefined;
}

export interface createNoteRequestBody {
  idUser: string | undefined;
  content: string | undefined;
  title: string | undefined;
}

export interface editNoteRequestBody {
  idUser: string | undefined;
  idNote: string | undefined;
  content: string | undefined;
  title: string | undefined;
}

export interface deleteNoteRequestBody {
  idNote: string | undefined;
}

export const API_MESSAGGES = {
  unexpectedError: 'Unexpected error, please retry',
  missingUserCreateRequestParamsError:
    'Some request body params missing: needed "email" and "password"',
  missingNewArchiveCreateRequestParamsError:
    'Some request body params missing: needed "userId" and "fetchedArticle"',
  missingArticleDeletionRequestParamsError:
    'Some request body params missing: needed "userId" and "articleId"',
  missingUserIdRequestParamsError: 'No userId found in query params',
  userEmailAlreadyExists: 'Email already in use for registered user',
  wrongUserCredentials: 'Wrong password or email submited',
  unexistingUserEmail: 'No user found with email ',
  userDoesNotMatchToken: 'User does not match token, retry login',
};
