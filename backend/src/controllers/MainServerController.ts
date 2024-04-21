import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import AxiosRequest from "../helpers/AxiosRequest.js";

class MainServerController {
  static async getFromDepartments<T>(
    req: Request<undefined, undefined, undefined, T>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { query } = req;
      const requestsList: Promise<T | ApiError>[] = [];
      for (const department of req.departmentList) {
        if (
          department.id === req.department.id ||
          (req.replicationData && req.replicationData.donorDepartmentId !== department.id)
        ) {
          continue;
        }
        requestsList.push(AxiosRequest(department.domain + req.reqURL, query));
        if (req.replicationData) {
          req.departmentList[0] = department;
          break;
        }
      }
      const resultRequest = await Promise.any(requestsList);
      if (resultRequest instanceof ApiError) {
        return next(resultRequest);
      }
      req.data = resultRequest;
      res.json(resultRequest);
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  // async getUserF
}

export default MainServerController;
