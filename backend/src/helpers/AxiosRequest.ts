import axios, { AxiosResponse } from "axios";
import ApiError from "./ApiErrors.js";
/**
 * Axios request
 * @param link - link to request
 * @param params - parameters for request
 * @param APIKey - API key for request
 * @type {(link: string, params: D, APIKey: string) => Promise<T | ApiError>}
 */
export default async <T, D>(link: string, params: D, APIKey: string = "", url: string = ''): Promise<AxiosResponse<T> | ApiError> => {
  try {
    const result = await axios.get<T>(link + `/${url}`, {
      params: params,
      headers: {
        Authorization: "Basic " + APIKey,
      },
    });
    return result;
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
