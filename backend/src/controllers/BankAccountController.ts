import ApiError from "../helpers/ApiErrors.js";
import { BankAccount } from "../models/BankAccount.js";
import { Request, Response, NextFunction } from "express";
import { Client } from "../models/Client.js";
import { BankAccountCreationAttributes } from "../types/types.js";

class BankAccountController {
  async initialize(clients: Client[]): Promise<BankAccount[]> {
    const bankAccountValues: BankAccountCreationAttributes[] = [];
    for (const client of clients) {
      bankAccountValues.push({
        balance: 1000,
        clientId: client.id,
      });
    }
    return await BankAccount.bulkCreate(bankAccountValues);
  }

  async getBankAccountByClientId(req: Request, res: Response, next: NextFunction) {
    try {
      let bankAccount;
      const { id, clientId } = req.query;
      console.log(`id = ${id}`);

      if (typeof id === "string") {
        bankAccount = await BankAccount.findAll({ where: { id } });
      } else if (typeof clientId === "string") {
        bankAccount = await BankAccount.findAll({ where: { clientId } });
      } else {
        return next(ApiError.badRequest("id or clientId is required"));
      }

      if (!bankAccount) {
        return next(ApiError.notFound("Bank account not found"));
      }
      res.json(bankAccount);
    } catch (error) {
      // console.log(error);
      return next(ApiError.internal("Error getting bank account"));
    }
  }

  async createBankAccount(req: Request, res: Response, next: NextFunction) {
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

  async updateBankAccount(req: Request, res: Response, next: NextFunction) {
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

export default new BankAccountController();
