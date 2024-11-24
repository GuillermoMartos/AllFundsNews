import { MESSAGGES } from '../helpers/constants';
import { CustomError } from '../helpers/helpers';
import { createNewUserRepository } from '../repository/user';

export const createNewUserService = async (email: string, password: string) => {
  try {
    //servicio se encarga de la lógica: validar datos y encriptarlos.
    if (!email || !password) {
      throw new CustomError(MESSAGGES.missingUserCreateRequestParamsError, 422);
    }
    //encriptar email y password para seguridad ante posibles leaks de DB.
    const newUser = createNewUserRepository(email, password);

    /* aquí podríamos usar una API Gateway para usar nuestra ruta de usuario y la ruta de obtener noticias
    para el usuario. De momento, las mantengo en una sola llamada, aunque no sea lo óptimo en términos de
    autonomía y concepto de las capas que definimos para el proyecto */
    //to do: usar servicio de fectch de noticias
    return newUser;
  } catch (error) {
    throw error;
  }
};
