import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import { Replication } from "../models/Replication.js";

class ReplicationController {
  async getUserByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName } = req.query;
      const replicationData = await Replication.findOne({ where: { firstName, lastName } });
      if (!replicationData) {
        return next();
      }
      if (clientId) {
        req.replicationData = await Replication.findOne({ where: { cli } });
      }
      const departmentByUser = await replicationData.getDepartment();
      if (!departmentByUser) {
        return next(ApiError.notFound("Department by replicated user not found"));
      }
      req.replicationData = replicationData;
      req.department = departmentByUser;
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  async createReplication(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: departmentId } = req.department;
      const { id: clientId, firstName, lastName } = req.user;
      await Replication.create({ clientId, departmentId, firstName, lastName });
      return;
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }
}

export default new ReplicationController();
