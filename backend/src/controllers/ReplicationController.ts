import ApiError from "../helpers/ApiErrors.js";
import { Response, NextFunction } from "express";
import { Replication } from "../models/Replication.js";
// import { ClientAttributes } from "../types/types.js";
import { TClientCreateValidated } from "../helpers/ZodSchemas/UserSchema.js";
import { AxiosResponse } from "axios";

class ReplicationController {
  static async createReplication(
    req: MyRequest<unknown, unknown, unknown, AxiosResponse<TClientCreateValidated>>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { data, donorDepartment, recipientDepartment } = req;
      if (!data || !donorDepartment || !recipientDepartment) {
        return next(
          ApiError.internal("Controllers don't save required data: recipientDepartment or donorDepartment or data"),
        );
      }
      const { id: clientId, firstName, lastName } = data.data;
      await Replication.create({
        clientId,
        donorDepartmentId: donorDepartment.id,
        recipientDepartmentId: recipientDepartment.id,
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
