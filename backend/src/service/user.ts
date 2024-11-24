import { MESSAGGES } from '../helpers/constants';
import {
  CustomError,
  encrypt,
  getFirstHundredNewsByUserStrategy,
} from '../helpers/helpers';
import {
  createNewUserRepository,
  loginUserRepository,
} from '../repository/user';
import { userCreateOrLoginResponse } from '../DAO/user';

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
    const oneHundredFreshNews = await getFirstHundredNewsByUserStrategy(
      newUser.searchStrategy.pop(),
    );

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
    const newUser = await loginUserRepository(cryptedMail, cryptedPassword);

    /* aquí podríamos usar una API Gateway para usar nuestra ruta de usuario y la ruta de obtener noticias
    para el usuario. De momento, las mantengo en una sola llamada, aunque no sea lo óptimo en términos de
    autonomía y concepto de las capas que definimos para el proyecto */
    const oneHundredFreshNews = await getFirstHundredNewsByUserStrategy(
      newUser.searchStrategy.pop(),
    );

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
