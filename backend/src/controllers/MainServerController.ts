import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { Client } from "../models/Client.js";

class MainServerController {
  static async getUserFromDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName } = req.validatedQuery;
      const requestsList: Promise<AxiosResponse<Client>>[] = [];
      for (const department of req.departmentList) {
        requestsList.push(axios.get<Client>(department.domain + "/clients", { params: { firstName, lastName } }));
      }
      const resultsRequests = await Promise.allSettled(requestsList);
      const result = resultsRequests.find((value): value is PromiseFulfilledResult<AxiosResponse<Client>> => {
        return value.status === "fulfilled";
      })?.value;
      if (!result) {
        return next(ApiError.notFound("User not found in another departments"));
      }
      const { url } = result.config;
      if (!url) {
        return next(ApiError.notFound("Request sendler URL not found"));
      }
      const department = req.departmentList.find((value) => {
        return value.domain + "/clients" === url;
      });
      if (!department) {
        return next(ApiError.notFound("Department for replication not found"));
      }
      req.department = department;
      req.user = result.data;
      res.json(result.data);
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  // async getUserF
}

export default MainServerController;
