import ApiError from "../helpers/ApiErrors.js";
import { BankAccount, BankAccountAttributes } from "../models/BankAccount.js";
import { Client } from "../models/Client.js";

class BankAccountController {
  async initialize(clients: Client[]): Promise<BankAccount[]> {
    const bankAccountValues: BankAccountAttributes[] = [];
    for (const client of clients) {
      bankAccountValues.push({
        balance: 1000,
        clientId: client.id,
        departmentIdWhereOpen: client.departmentId,
      });
    }
    return await BankAccount.bulkCreate(bankAccountValues);
  }
}

export default new BankAccountController();
