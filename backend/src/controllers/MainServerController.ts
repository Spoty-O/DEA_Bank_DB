import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { Client } from "../models/Client.js";

class MainServerController {
  static async requestForUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { domain } = req.department;
      const { clientId } = req.replicationData;
      const { data } = await axios.get<Client>(domain + "/clients", { params: { id: clientId } });
      return res.json(data);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  static async getUserFromDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName } = req.params;
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
        return next(ApiError.notFound("URL departamenta ne nasol lol"));
      }
      const department = req.departmentList.find((value) => {
        if (value.domain == url) return true;
        else return false;
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
