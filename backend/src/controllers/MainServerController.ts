import ApiError from "../helpers/ApiErrors.js";
import { Response, NextFunction } from "express";
import { AxiosGetRequest, AxiosUpdateRequest } from "../helpers/AxiosRequest.js";
import { AxiosResponse } from "axios";
import { RequestQuery } from "../types/types.js";

class MainServerController {
  static getFromDepartments =
    (requestURL: string) =>
    async <Query extends RequestQuery>(
      req: MyRequest<{ id?: string }, Query, unknown, AxiosResponse>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { query, params } = req;
        query.serverRequest = "true";
        const requestsList: Promise<AxiosResponse | ApiError>[] = [];
        if (!req.departmentList || !req.recipientDepartment) {
          return next(ApiError.internal("Controllers don't save required data: departmentList or recipientDepartment"));
        }
        for (const department of req.departmentList) {
          if (department.id === req.recipientDepartment.id) {
            continue;
          }
          requestsList.push(AxiosGetRequest(department.domain + requestURL, query, undefined, params.id));
        }
        const resultRequest = await Promise.any(requestsList);
        if (resultRequest instanceof ApiError) {
          return next(resultRequest);
        }
        console.log(resultRequest.data);
        req.data = resultRequest;
        res.json(resultRequest.data);
        return next();
      } catch (error) {
        console.log(error);
        return next(ApiError.internal("Error getting info from departments"));
      }
    };

  static patchToDepartments = (requestURL: string) =>async <Query extends RequestQuery, B>(req: MyRequest<{ id?: string }, Query, B, AxiosResponse>,res: Response,next: NextFunction,
    ) => {
      try {
        const { query, params } = req;
        query.serverRequest = "true";
        const requestsList: Promise<AxiosResponse | ApiError>[] = [];
        if (!req.departmentList || !req.recipientDepartment) {
          return next(ApiError.internal("Controllers don't save required data: departmentList or recipientDepartment"));
        }
        for (const department of req.departmentList) {
          if (department.id === req.recipientDepartment.id) {
            continue;
          }
          requestsList.push(AxiosUpdateRequest(department.domain + requestURL, query, req.body, undefined, params.id));
        }
        const resultsOfRequest = await Promise.allSettled(requestsList);
        let message = "";
        for (const result of resultsOfRequest) {
          if (result.status === 'rejected') {
            message += result.reason
          } else {
            message += "Complete 1"
          }
          console.log(result)
        }
        return res.json({ message });
      } catch (error) {
        console.log(error);
        return next(ApiError.internal("Error getting info from departments"));
      }
    };

  // async getUserF
}

export default MainServerController;
