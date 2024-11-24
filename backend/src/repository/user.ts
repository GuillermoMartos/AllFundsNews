import { MESSAGGES } from '../helpers/constants';
import { CustomError, pickNewStrategyAndReturnArray } from '../helpers/helpers';
import { User } from '../models/user';

export const createNewUserRepository = async (
  email: string,
  password: string,
) => {
  try {
    const newUser = await User.create({
      email,
      password,
    });
    return newUser;
  } catch (error: any) {
    // error de repeticion de campo único en Mongo para user: email existente
    if (error.code === 11000) {
      throw new CustomError(MESSAGGES.userEmailAlreadyExists, 409);
    }
    throw error;
  }
};

export const loginUserRepository = async (email: string, password: string) => {
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      throw new CustomError(MESSAGGES.unexistingUserEmail, 401);
    }
    if (user?.password !== password) {
      throw new CustomError(MESSAGGES.wrongUserCredentials, 401);
    }

    user.searchStrategy = pickNewStrategyAndReturnArray(user.searchStrategy);
    await user.save();

    return user;
  } catch (error: any) {
    throw error;
  }
};
