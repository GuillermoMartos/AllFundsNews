import { MESSAGGES } from '../helpers/constants';
import {
  CustomError,
  encrypt,
  fetchFiftyNewsByUserStrategy,
} from '../helpers/helpers';
import {
  createNewUserRepository,
  loginUserRepository,
} from '../repository/user';
import { userCreateOrLoginResponse } from '../DAO/user';
import { addUserToCache } from '../helpers/cache';
import { UserData } from '../helpers/types';

export const createNewUserService = async (
  email: string,
  password: string,
): Promise<userCreateOrLoginResponse> => {
  try {
    //servicio se encarga de la lógica: validar datos y encriptarlos. Luego pedir las primeras 100 noticias actuales en español
    if (!email || !password) {
      throw new CustomError(MESSAGGES.missingUserCreateRequestParamsError, 422);
    }
    const cryptedMail = encrypt(email);
    const cryptedPassword = encrypt(password);
    const newUser = await createNewUserRepository(cryptedMail, cryptedPassword);

    /* aquí podríamos usar una API Gateway para usar nuestra ruta de usuario y la ruta de obtener noticias
    para el usuario. De momento, las mantengo en una sola llamada, aunque no sea lo óptimo en términos de
    autonomía y concepto de las capas que definimos para el proyecto */
    const oneHundredFreshNews = await fetchFiftyNewsByUserStrategy(
      newUser.searchStrategy.pop() as string,
    );

    addUserToCache(newUser.id, {
      id: newUser.id,
      searchStrategy: newUser.searchStrategy,
      archivedNewsIds: newUser.archivedNewsIds,
      deletedNewsIds: newUser.deletedNewsIds,
    } as UserData);

    return {
      id: newUser.id,
      archivedNewsIds: newUser.archivedNewsIds,
      deletedNewsIds: newUser.deletedNewsIds,
      freshNews: oneHundredFreshNews,
    };
  } catch (error) {
    throw error;
  }
};

export const loginUserService = async (
  email: string,
  password: string,
): Promise<userCreateOrLoginResponse> => {
  try {
    if (!email || !password) {
      throw new CustomError(MESSAGGES.missingUserCreateRequestParamsError, 422);
    }
    const cryptedMail = encrypt(email);
    const cryptedPassword = encrypt(password);
    const user = await loginUserRepository(cryptedMail, cryptedPassword);

    /* aquí podríamos usar una API Gateway para usar nuestra ruta de usuario y la ruta de obtener noticias
    para el usuario. De momento, las mantengo en una sola llamada, aunque no sea lo óptimo en términos de
    autonomía y concepto de las capas que definimos para el proyecto */
    const oneHundredFreshNews = await fetchFiftyNewsByUserStrategy(
      user.searchStrategy.pop() as string,
    );

    addUserToCache(user.id, user);

    return {
      id: user.id,
      archivedNewsIds: user.archivedNewsIds,
      deletedNewsIds: user.deletedNewsIds,
      freshNews: oneHundredFreshNews,
    };
  } catch (error) {
    throw error;
  }
};
