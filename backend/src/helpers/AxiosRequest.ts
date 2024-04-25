import axios, { AxiosResponse } from "axios";
import ApiError from "./ApiErrors.js";
/**
 * Axios request
 * @param link - link to request
 * @param params - parameters for request
 * @param APIKey - API key for request
 * @param url - parameter (can be userId or something like it)
 */
const AxiosGetRequest = async <T, D>(
  link: string,
  params: D,
  APIKey: string = "",
  url: string = "",
): Promise<AxiosResponse<T> | ApiError> => {
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

const AxiosUpdateRequest = async <T, D, B>(
  link: string,
  params: D,
  body: B | undefined,
  APIKey: string = "",
  url: string = "",
): Promise<AxiosResponse<T> | ApiError> => {
  try {
    const result = await axios.patch<T>(
      link + `/${url}`,
      {},
      {
        headers: {
          Authorization: "Basic " + APIKey,
        },
        params: params,
        data: body,
      },
    );
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

export { AxiosGetRequest, AxiosUpdateRequest };
