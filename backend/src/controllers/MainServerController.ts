import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import { Client } from "../models/Client.js";
import AxiosRequest from "../helpers/AxiosRequest.js";
import { RequestQuery } from "../types/types.js";

class MainServerController {
  static async getUserFromDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName } = req.validatedQuery;
      const requestsList: Promise<Client | ApiError>[] = [];
      for (const department of req.departmentList) {
        if (
          department.id === req.department.id ||
          (req.replicationData && req.replicationData.donorDepartmentId !== department.id)
        ) {
          continue;
        }
        requestsList.push(
          AxiosRequest<Client, RequestQuery>(department.domain + "/clients/find", {
            firstName,
            lastName,
            noReplicate: true,
          }),
        );
        if (req.replicationData) {
          req.departmentList[0] = department;
          break;
        }
      }
      const resultRequest = await Promise.any(requestsList);
      if (resultRequest instanceof ApiError) {
        return next(resultRequest);
      }
      req.user = resultRequest;
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
