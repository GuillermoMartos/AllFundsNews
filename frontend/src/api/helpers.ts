import axios from "axios";

export const POST_APIWithToken = async <T>(
  url: string,
  token: string,
  body?: object,
): Promise<T> => {
  try {
    const { data } = await axios.post(url, body, {
      headers: {
        Authorization: token,
      },
    });

    return data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    throw error;
  }
};

export const GET_APIWithToken = async <T>(
  url: string,
  token: string,
): Promise<T> => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    return data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    throw error;
  }
};
