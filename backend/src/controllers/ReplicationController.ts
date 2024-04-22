import ApiError from "../helpers/ApiErrors.js";
import { Response, NextFunction } from "express";
import { Replication } from "../models/Replication.js";
// import { ClientAttributes } from "../types/types.js";
import { TClientCreateValidated, TClientGetValidated } from "../helpers/ZodSchemas/UserSchema.js";

class ReplicationController {
  static async getUserByName(req: MyRequest<unknown, TClientGetValidated>, res: Response, next: NextFunction) {
    try {
      req.query.serverRequest = "true";
      const { firstName, lastName } = req.query;
      if (!req.recipientDepartment) {
        return next(ApiError.internal("Controllers don't save required data: recipientDepartment"));
      }
      const replicationData = await Replication.findOne({
        where: { firstName, lastName, recipientDepartmentId: req.recipientDepartment.id },
      });
      if (replicationData) {
        return next(ApiError.conflict("User already added to your DB"));
      }
      req.reqURL = "/clients/find/replication";
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  // static async getBankAccountByClientId(
  //   req: MyRequest<undefined, TBankAccount>,
  //   res: Response,
  //   next: NextFunction,
  // ) {
  //   try {
  //     req.query.noReplicate = true;
  //     // const { clientId } = req.query;
  //     // const replicationData = await Replication.findOne({
  //     //   where: { clientId, recipientDepartmentId: req.recipientDepartment.id },
  //     // });
  //     // if (replicationData) {
  //     //   return next(ApiError.conflict("BankAccount already added to your DB"));
  //     // }
  //     req.reqURL = "/bankAccounts";
  //     return next();
  //   } catch (error) {
  //     console.log(error);
  //     return next(ApiError.internal("Error getting client"));
  //   }
  // }

  static async createReplication(
    req: MyRequest<unknown, unknown, unknown, TClientCreateValidated>,
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
      const { id: clientId, firstName, lastName } = data;
      await Replication.create({
        clientId,
        donorDepartmentId: donorDepartment.id,
        recipientDepartmentId: recipientDepartment.id,
        firstName,
        lastName,
      });
      return res.json({ message: "User replicated!" });
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }
}

export default ReplicationController;
