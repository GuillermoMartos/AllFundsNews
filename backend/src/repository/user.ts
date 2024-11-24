import { CustomError } from '../helpers/helpers';
import { User } from '../models';

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
      throw new CustomError('Email already exists', 400);
    }
    throw error;
  }
};
