import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import { Replication } from "../models/Replication.js";
import { BankAccountFindAttributes, ClientAttributes, ClientFindByNameAttributes, RequestQueryGet } from "../types/types.js";

class ReplicationController {
  static async getUserByName(
    req: Request<unknown, unknown, unknown, RequestQueryGet<ClientFindByNameAttributes>>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      req.query.noReplicate = "true";
      const { firstName, lastName } = req.query;
      const replicationData = await Replication.findOne({
        where: { firstName, lastName, recipientDepartmentId: req.recipientDepartment.id },
      });
      if (replicationData) {
        return next(ApiError.conflict("User already added to your DB"));
      }
      req.reqURL = "/clients/find";
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  static async getBankAccountByClientId(
    req: Request<unknown, unknown, unknown, RequestQueryGet<BankAccountFindAttributes>>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      req.query.noReplicate = "true";
      // const { clientId } = req.query;
      // const replicationData = await Replication.findOne({
      //   where: { clientId, recipientDepartmentId: req.recipientDepartment.id },
      // });
      // if (replicationData) {
      //   return next(ApiError.conflict("BankAccount already added to your DB"));
      // }
      req.reqURL = "/bankAccounts";
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  static async createReplication(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: clientId, firstName, lastName } = <ClientAttributes>req.data;
      await Replication.create({
        clientId,
        donorDepartmentId: req.donorDepartment.id,
        recipientDepartmentId: req.recipientDepartment.id,
        firstName,
        lastName,
      });
      return res.json({message: "User replicated!"});
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }
}

export default ReplicationController;
