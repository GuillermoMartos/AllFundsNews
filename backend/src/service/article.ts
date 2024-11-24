import { MESSAGGES } from '../helpers/constants';
import { CustomError } from '../helpers/helpers';

export const getHundredFreshNewsService = async (userId: string) => {
  try {
    //servicio se encarga de la lógica: traer 100 noticias filtradas de BD por usuario sin archivar. Si no alcanzan, pedir almacenar nuevas.
    if (!userId) {
      throw new CustomError(MESSAGGES.missingUserIdRequestParamsError, 422);
    }
    const firstHundredFreshNews = [1, 2, 3];

    return firstHundredFreshNews;
  } catch (error) {
    throw error;
  }
};
