import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import { Replication } from "../models/Replication.js";

class ReplicationController {
  static async getUserByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName } = req.validatedQuery;
      const replicationData = await Replication.findOne({
        where: { firstName, lastName },
      });
      if (replicationData) {
        req.replicationData = replicationData
        if (replicationData.recipientDepartmentId === req.department.id) {
          return next(ApiError.conflict("User already added to your DB"));
        }
      }
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  static async createReplication(req: Request, res: Response, next: NextFunction) {
    try {
      const donor = req.departmentList[0];
      const { id: clientId, firstName, lastName } = req.user;
      await Replication.create({
        clientId,
        donorDepartmentId: donor.id,
        recipientDepartmentId: req.department.id,
        firstName,
        lastName,
      });
      return;
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }
}

export default ReplicationController;
