import ApiError from "../helpers/ApiErrors.js";
import { BankAccount } from "../models/BankAccount.js";
import { Response, NextFunction } from "express";
import { Client } from "../models/Client.js";
import { BankAccountCreationAttributes, BankAccountFindAttributes, RequestQueryGet } from "../types/types.js";
import AxiosRequest from "../helpers/AxiosRequest.js";

class BankAccountController {
  static async initialize(clients: Client[]): Promise<BankAccount[]> {
    const bankAccountValues: BankAccountCreationAttributes[] = [];
    for (const client of clients) {
      bankAccountValues.push({
        balance: 1000,
        clientId: client.id,
      });
    }
    return await BankAccount.bulkCreate(bankAccountValues);
  }

  static async getBankAccountByClientId(
    req: MyRequest<unknown, RequestQueryGet<BankAccountFindAttributes>>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { clientId } = req.query;
      const bankAccount = await BankAccount.findAll({ where: { clientId } });
      if (!bankAccount[0]) {
        return next(ApiError.notFound("BankAccounts not found"));
      }
      return res.json(bankAccount);
    } catch (error) {
      // console.log(error);
      return next(ApiError.internal("Error getting bank account"));
    }
  }

  static async getBankAccountFromMain(
    req: MyRequest<unknown, RequestQueryGet<BankAccountFindAttributes>, undefined, BankAccount[]>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { clientId } = req.query;
      const result = await AxiosRequest<BankAccount[], RequestQueryGet<BankAccountFindAttributes>>(
        "http://localhost:5000/api/replication/bankAccounts",
        { clientId },
        process.argv[4],
      );
      if (result instanceof ApiError) {
        return next(result);
      }
      req.data = result.data;
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  static async createBankAccount(
    req: MyRequest<unknown, unknown, BankAccountCreationAttributes>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { balance, clientId } = req.body;

      if (balance === undefined || !clientId) {
        return next(ApiError.badRequest("balance, clientId are required"));
      }

      const client = await Client.findOne({ where: { id: clientId } });
      if (!client) {
        return next(ApiError.notFound("Client not found"));
      }

      const bankAccount = await BankAccount.create({
        balance: balance,
        clientId: clientId,
      });

      res.json(bankAccount);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error creating bank account"));
    }
  }

  static async updateBankAccount(
    req: MyRequest<BankAccountFindAttributes, undefined, BankAccountCreationAttributes>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { balance, clientId } = req.body;

      if (!balance || !clientId) {
        return next(ApiError.badRequest("balance, clientId are required"));
      }

      const bankAccount = await BankAccount.findByPk(id);
      if (!bankAccount) {
        return next(ApiError.notFound("Bank account not found"));
      }

      const result = await bankAccount.update({
        balance,
        clientId,
      });

      res.json(result);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error updating bank account"));
    }
  }
}

export default BankAccountController;
