import ApiError from "../helpers/ApiErrors.js";
import { Response, NextFunction } from "express";
import { Replication } from "../models/Replication.js";
import { ClientAttributes, RequestQueryClientGet } from "../types/types.js";

class ReplicationController {
  static async getUserByName(req: ExtendedRequest<undefined, RequestQueryClientGet>, res: Response, next: NextFunction) {
    try {
      req.query.noReplicate = true;
      const { firstName, lastName } = req.query;
      const replicationData = await Replication.findOne({
        where: { firstName, lastName },
      });
      req.replicationData = replicationData;
      if (replicationData?.recipientDepartmentId === req.recipientDepartment.id) {
        return next(ApiError.conflict("User already added to your DB"));
      }
      req.reqURL = "/clients/find";
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  static async createReplication(
    req: Express.ExtendedRequest<undefined, undefined, undefined, ClientAttributes>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id: clientId, firstName, lastName } = req.data;
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
