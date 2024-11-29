import axios, { AxiosError } from "axios";
import {
  performUserLoguinRequestBody,
  createNewUserRequestBody,
  userUrlsMap,
  API_MESSAGGES,
} from "../constants/api";
import { userLoginResponseObject } from "../types/user";

export const performUserLogin = async (
  data: performUserLoguinRequestBody,
): Promise<userLoginResponseObject> => {
  try {
    const response = await axios.post(
      userUrlsMap.USER_LOGIN_URL,
      { ...data },
      { headers: { "Content-Type": "application/json" } },
    );
    const token = response.headers["authorization"];
    return { ...response.data, token };
  } catch (error) {
    if (
      error instanceof AxiosError &&
      (error.response?.data.message.includes(
        API_MESSAGGES.unexistingUserEmail,
      ) ||
        error.response?.data.message.includes(
          API_MESSAGGES.wrongUserCredentials,
        ))
    ) {
      alert(error.response?.data.message);
      console.log(error.response?.data.message);
      console.log(error.message);
      throw error;
    }
    alert("Error");
    console.log(error);
    throw error;
  }
};

export const performUserRegister = async (
  data: createNewUserRequestBody,
): Promise<userLoginResponseObject> => {
  try {
    const response = await axios.post(
      userUrlsMap.USER_CREATE_URL,
      { ...data },
      { headers: { "Content-Type": "application/json" } },
    );
    const token = response.headers["authorization"];
    return { ...response.data, token };
  } catch (error) {
    if (
      error instanceof AxiosError &&
      (error.response?.data.message.includes(
        API_MESSAGGES.missingUserCreateRequestParamsError,
      ) ||
        error.response?.data.message.includes(
          API_MESSAGGES.userEmailAlreadyExists,
        ))
    ) {
      alert(error.response?.data.message);
      console.log(error.response?.data.message);
      console.log(error.message);
      throw error;
    }
    alert("Error");
    console.log(error);
    throw error;
  }
};
