import ApiError from "../helpers/ApiErrors.js";
import { Response, NextFunction } from "express";
import AxiosRequest from "../helpers/AxiosRequest.js";
import { AxiosResponse } from "axios";

class MainServerController {
  static async getFromDepartments<T>(req: MyRequest<unknown, unknown, unknown, T>, res: Response, next: NextFunction) {
    try {
      const { query } = req;
      const requestsList: Promise<AxiosResponse<T> | ApiError>[] = [];
      if (!req.departmentList || !req.recipientDepartment) {
        return next(ApiError.internal("Controllers don't save required data: departmentList or recipientDepartment"))
      }
      for (const department of req.departmentList) {
        if (department.id === req.recipientDepartment.id) {
          continue;
        }
        requestsList.push(AxiosRequest(department.domain + req.reqURL, query));
      }
      const resultRequest = await Promise.any(requestsList);
      if (resultRequest instanceof ApiError) {
        return next(resultRequest);
      }
      const { config, data } = resultRequest;
      if (!config.url) {
        return next(ApiError.internal("Donor department URL undefined"))
      }
      req.reqURL = config.url;
      req.data = data;
      res.json(data)
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  // async getUserF
}

export default MainServerController;
