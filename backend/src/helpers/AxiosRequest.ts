import axios from "axios";
import ApiError from "./ApiErrors.js";

export default async <T, D>(link: string, params: D, APIKey: string = ""): Promise<T | ApiError> => {
  try {
    const { data } = await axios.get<T>(link, {
      params: params,
      headers: {
        Authorization: "Basic " + APIKey,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      if (error.response) {
        return new ApiError(error.response.status, error.response.data.message);
      }
      if (error.request) {
        return ApiError.internal("Request by network failed");
      }
    }
    return ApiError.internal("Axios request error");
  }
};
