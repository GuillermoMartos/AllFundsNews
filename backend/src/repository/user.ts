import { MESSAGGES } from '../helpers/constants';
import {
  compareSaltedHashedData,
  CustomError,
  hashData,
  pickNewStrategyAndReturnArray,
} from '../helpers/helpers';
import { UserData } from '../helpers/types';
import { User } from '../models/user';

export const createNewUserRepository = async (
  email: string,
  password: string,
): Promise<UserData> => {
  try {
    const newUser = await User.create({
      email,
      password,
    });
    return newUser as UserData;
  } catch (error: any) {
    // error de repeticion de campo único en Mongo para user: email existente
    if (error.code === 11000) {
      throw new CustomError(MESSAGGES.userEmailAlreadyExists, 409);
    }
    throw error;
  }
};

export const loginUserRepository = async (
  email: string,
  password: string,
): Promise<UserData> => {
  try {
    const cryptedMail = hashData(email);
    const user = await User.findOne({
      email: cryptedMail,
    });
    if (!user) {
      throw new CustomError(MESSAGGES.unexistingUserEmail, 401);
    }
    if (!compareSaltedHashedData(password, user.password)) {
      throw new CustomError(MESSAGGES.wrongUserCredentials, 401);
    }

    user.searchStrategy = pickNewStrategyAndReturnArray(user.searchStrategy);
    await user.save();

    return {
      id: user.id,
      searchStrategy: user.searchStrategy,
      archivedNewsIds: user.archivedNewsIds,
      deletedNewsIds: user.deletedNewsIds,
    } as UserData;
  } catch (error: any) {
    throw error;
  }
};

export const getUserHistoryRepository = async (
  userId: string,
): Promise<any> => {
  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    console.error('[ERROR FINDING EXPECTED USER]: userId ', userId);
    throw new CustomError(MESSAGGES.unexpectedError, 500);
  }

  user.searchStrategy = pickNewStrategyAndReturnArray(user.searchStrategy);
  await user.save();

  return user;
};
