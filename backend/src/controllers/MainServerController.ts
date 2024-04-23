import ApiError from "../helpers/ApiErrors.js";
import { Response, NextFunction } from "express";
import AxiosRequest from "../helpers/AxiosRequest.js";
import { AxiosResponse } from "axios";
import { RequestQuery } from "../types/types.js";

class MainServerController {
  //requestURL = "/clients/find/replication";
  static getFromDepartments =
    (requestURL: string) =>
    async <Query extends RequestQuery>(req: MyRequest<unknown, Query, unknown, AxiosResponse>, res: Response, next: NextFunction) => {
      try {
        const { query } = req;
        query.serverRequest = "true"
        const requestsList: Promise<AxiosResponse | ApiError>[] = [];
        if (!req.departmentList || !req.recipientDepartment) {
          return next(ApiError.internal("Controllers don't save required data: departmentList or recipientDepartment"));
        }
        for (const department of req.departmentList) {
          if (department.id === req.recipientDepartment.id) {
            continue;
          }
          requestsList.push(AxiosRequest(department.domain + requestURL, query));
        }
        const resultRequest = await Promise.any(requestsList);
        if (resultRequest instanceof ApiError) {
          return next(resultRequest);
        }
        console.log(resultRequest.data)
        req.data = resultRequest;
        res.json(resultRequest.data);
        return next();
      } catch (error) {
        console.log(error);
        return next(ApiError.internal("Error getting info from departments"));
      }
    };

  // async getUserF
}

export default MainServerController;
