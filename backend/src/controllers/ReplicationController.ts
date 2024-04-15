import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import { Replication } from "../models/Replication.js";
import MainServerController from "./MainServerController.js";

class ReplicationController {
  async getUserByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName } = req.body;
      const replicationData = await Replication.findOne({ where: { firstName, lastName } });
      if (!replicationData) {
        return next(MainServerController.getUserFromDepartments);
      }
      const departmentByUser = await replicationData.getDepartment();
      if (!departmentByUser) {
        return next(ApiError.notFound("Department by replicated user not found"));
      }
      req.replicationData = replicationData;
      req.department = departmentByUser;
      return next(MainServerController.getUserFromDepartment);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }
}

export default new ReplicationController();
