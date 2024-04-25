import ApiError from "../helpers/ApiErrors.js";
import { BankAccount } from "../models/BankAccount.js";
import { Response, NextFunction } from "express";
import { Client } from "../models/Client.js";
import { BankAccountAttributes, RequestQuery } from "../types/types.js";
import { AxiosGetRequest, AxiosUpdateRequest } from "../helpers/AxiosRequest.js";
import { TBankAccountGetValidated, TBankAccountCreateValidated } from "../helpers/ZodSchemas/BankSchema.js";

class BankAccountController {
  static async initialize(clients: Client[]): Promise<BankAccount[]> {
    const bankAccountValues: BankAccountAttributes[] = [];
    for (const client of clients) {
      bankAccountValues.push({
        balance: 1000,
        clientId: client.id,
      });
    }
    return await BankAccount.bulkCreate(bankAccountValues);
  }

  static async getBankAccountByClientId(
    req: MyRequest<{ clientId: string }, TBankAccountGetValidated>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { clientId } = req.params;
      const { serverRequest } = req.query;
      const bankAccount = await BankAccount.findAll({ where: { clientId } });
      if (!bankAccount[0]) {
        if (serverRequest === "false" || !serverRequest) {
          return next();
        }
        return next(ApiError.notFound("Bank accounts not found"));
      }
      return res.json(bankAccount);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting bank account"));
    }
  }

  static async getClientByBankAccountId(
    req: MyRequest<{ bankAccountId: string }, unknown, unknown, Client>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { bankAccountId } = req.params;
      const bankAccount = await BankAccount.findOne({ where: { id: bankAccountId } });
      if (!bankAccount) {
        return next(ApiError.notFound("Bank account not found"));
      }
      const client = await bankAccount.getClient();
      req.data = client;
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting bank account"));
    }
  }

  static async getBankAccountFromMain(
    req: MyRequest<{ clientId: string }, TBankAccountGetValidated, BankAccount[]>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { clientId } = req.params;
      const result = await AxiosGetRequest<BankAccount[], { id: string }>(
        `http://localhost:5000/api/replication/bankAccounts/${clientId}`,
        { id: clientId },
        process.argv[4],
      );
      if (result instanceof ApiError) {
        return next(result);
      }
      req.body = result.data;
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  static async createBankAccount(
    req: MyRequest<unknown, unknown, TBankAccountCreateValidated | TBankAccountCreateValidated[]>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let bankAccount: TBankAccountCreateValidated | TBankAccountCreateValidated[] | undefined = undefined;
      if (req.body instanceof Array) {
        bankAccount = await BankAccount.bulkCreate(req.body);
      } else {
        bankAccount = await BankAccount.create(req.body);
      }
      return res.json(bankAccount);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error creating bank account"));
    }
  }

  static async updateBankAccount(
    req: MyRequest<{ id: string }, RequestQuery, TBankAccountCreateValidated, TBankAccountCreateValidated>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { serverRequest } = req.query;
      let bankAccount = await BankAccount.findByPk(id);
      if (!bankAccount) {
        return next(ApiError.notFound("Bank account not found"));
      }
      bankAccount = await bankAccount.update(req.body);
      req.data = bankAccount;
      res.json(bankAccount);
      if (serverRequest === "false" || !serverRequest) {
        next();
      }
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error updating bank account"));
    }
  }

  static async updateReplicationsForBankAccount(
    req: MyRequest<{ id: string }, unknown, unknown, TBankAccountCreateValidated>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      if (!req.data) {
        return next(ApiError.notFound("Client for replications update not found"));
      }
      const result = await AxiosUpdateRequest<{ message: string }, { id: string }, TBankAccountCreateValidated>(
        `http://localhost:5000/api/replication/bankAccounts/${id}`,
        { id: req.data.clientId },
        req.data,
        process.argv[4],
      );
      if (result instanceof ApiError) {
        return next(result);
      }
      return res.json(result.data);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error updating client"));
    }
  }
}

export default BankAccountController;
