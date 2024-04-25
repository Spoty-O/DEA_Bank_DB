import ApiError from "../helpers/ApiErrors.js";
import { Response, NextFunction } from "express";
import { AccountTransaction } from "../models/AccountTransaction.js";
import { BankAccount } from "../models/BankAccount.js";
import { AccountTransactionAttributes } from "../types/types.js";
import { TTransactionCreateValidated, TTransactionGetValidated } from "../helpers/ZodSchemas/TransactionSchema.js";
import { AxiosGetRequest } from "../helpers/AxiosRequest.js";
import { Client } from "../models/Client.js";

class AccountTransactionController {
  async initialize(bankAccounts: BankAccount[]): Promise<AccountTransaction[]> {
    const accountTransactionsValues: AccountTransactionAttributes[] = [];
    for (const bankAccount of bankAccounts) {
      accountTransactionsValues.push({
        amount: 500,
        date: new Date(),
        transactionType: "transfer",
        bankAccountId: bankAccount.id,
        recipientBankAccountId: bankAccount.id,
      });
    }
    return await AccountTransaction.bulkCreate(accountTransactionsValues);
  }

  static async getTransactions(
    req: MyRequest<{ bankAccountId: string }, TTransactionGetValidated>,
    res: Response,
    next: NextFunction,
  ) {
    //добавить типизацию
    try {
      const { bankAccountId } = req.params;
      const { serverRequest } = req.query;
      const transactions = await AccountTransaction.findAll({ where: { bankAccountId } });
      if (!transactions[0]) {
        if (serverRequest === "false" || !serverRequest) {
          return next();
        }
        return next(ApiError.notFound("Transactions not found"));
      }
      return res.json(transactions);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest("Ошибка получения транзакций!"));
    }
  }

  static async getTransactionsFromMain(
    req: MyRequest<{ bankAccountId: string }, TTransactionGetValidated, AccountTransaction[], Client>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { bankAccountId } = req.params;
      if (!req.data?.id) {
        return next(ApiError.internal("Linked Client with transaction not found"));
      }
      const result = await AxiosGetRequest<AccountTransaction[], { id: string }>(
        `http://localhost:5000/api/replication/transactions/${bankAccountId}`,
        { id: req.data.id },
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

  static async createTransaction(
    req: MyRequest<unknown, unknown, TTransactionCreateValidated | TTransactionCreateValidated[]>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let transactions: TTransactionCreateValidated | TTransactionCreateValidated[] | undefined = undefined;
      if (req.body instanceof Array) {
        transactions = await AccountTransaction.bulkCreate(req.body);
      } else {
        transactions = await AccountTransaction.create(req.body);
      }
      return res.json(transactions);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error creating bank account"));
    }
  }

  static async deposit(
    req: MyRequest<undefined, undefined, AccountTransactionAttributes>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { bankAccountId, amount } = req.body;
      console.log(1111111000, bankAccountId, amount);
      if (!bankAccountId || !amount) {
        return next(ApiError.badRequest("bankAccountId and amount are required"));
      }

      if (!Number(amount)) next(ApiError.badRequest("Amount is not a number"));

      const account = await BankAccount.findOne({ where: { id: bankAccountId } });

      if (!account) {
        return next(ApiError.badRequest("Account not found!"));
      }
      console.log(111111111, account.balance);
      const resul = await account.update({ balance: Number(account.balance) + Number(amount) });
      console.log(222222222, resul);
      await AccountTransaction.create({
        amount,
        date: new Date(),
        transactionType: "deposit",
        bankAccountId: bankAccountId,
        recipientBankAccountId: bankAccountId,
      });

      res.json({ message: "Deposit successful" });
    } catch (error) {
      console.error("Deposit failed:", error);
      return next(ApiError.badRequest("Deposit failed!"));
    }
  }

  static async withdraw(
    req: MyRequest<undefined, undefined, AccountTransactionAttributes>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { bankAccountId, amount } = req.body;

      if (!bankAccountId || !amount) {
        return next(ApiError.badRequest("bankAccountId and amount are required"));
      }

      if (!Number(amount)) next(ApiError.badRequest("Amount is not a number"));

      const account = await BankAccount.findByPk(bankAccountId);

      if (!account) {
        return next(ApiError.badRequest("Account not found!"));
      }

      if (Number(account.balance) < Number(amount)) {
        return next(ApiError.badRequest("Insufficient funds!"));
      }

      await account.update({ balance: Number(account.balance) - Number(amount) });

      await AccountTransaction.create({
        amount: -Number(amount),
        date: new Date(),
        transactionType: "withdrawal",
        bankAccountId: bankAccountId,
        recipientBankAccountId: bankAccountId,
      });

      res.json({ message: "Withdrawal successful" });
    } catch (error) {
      console.error("Withdrawal failed:", error);
      return next(ApiError.badRequest("Withdrawal failed!"));
    }
  }

  static async performTransfer(
    req: MyRequest<undefined, undefined, AccountTransactionAttributes>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // Получаем данные из запроса
      const { bankAccountId, recipientBankAccountId, amount } = req.body;

      if (!bankAccountId || !recipientBankAccountId || !amount) {
        return next(ApiError.badRequest("bankAccountId, recipientBankAccountId and amount are required"));
      }

      if (!Number(amount)) next(ApiError.badRequest("Amount is not a number"));

      // Находим банковские счета отправителя и получателя
      const senderAccount = await BankAccount.findByPk(bankAccountId);
      const recipientAccount = await BankAccount.findByPk(recipientBankAccountId);

      if (!senderAccount || !recipientAccount) {
        return next(ApiError.notFound("Sender or recipient account not found"));
      }

      if (senderAccount.id === recipientAccount.id) {
        return next(ApiError.badRequest("Sender and recipient accounts must be different"));
      }

      // Проверяем достаточность средств на счете отправителя
      if (Number(senderAccount.balance) < Number(amount)) {
        return next(ApiError.badRequest("Insufficient funds"));
      }

      // Получаем экземпляр sequelize
      const sequelize = BankAccount.sequelize;

      if (!sequelize || !sequelize.transaction) {
        return next(ApiError.internal("Unable to start transaction"));
      }

      // Начинаем транзакцию
      await sequelize.transaction(async (transaction) => {
        // Обновляем балансы отправителя и получателя
        await senderAccount.update({ balance: Number(senderAccount.balance) - Number(amount) }, { transaction });
        await recipientAccount.update({ balance: Number(recipientAccount.balance) + Number(amount) }, { transaction });

        // Создаем запись о транзакции списания средств
        await AccountTransaction.create(
          {
            amount: -Number(amount),
            date: new Date(),
            transactionType: "transfer",
            bankAccountId: bankAccountId,
            recipientBankAccountId: recipientBankAccountId,
          },
          { transaction },
        );

        // Создаем запись о транзакции зачисления средств
        await AccountTransaction.create(
          {
            amount: Number(amount),
            date: new Date(),
            transactionType: "transfer",
            bankAccountId: recipientBankAccountId,
            recipientBankAccountId: bankAccountId,
          },
          { transaction },
        );
      });

      // Отправляем успешный ответ
      return res.json({ message: "Transaction successful" });
    } catch (error) {
      // Обрабатываем ошибку
      console.error("Transaction failed:", error);
      return next(ApiError.badRequest("Transaction failed!"));
    }
  }
}

export default AccountTransactionController;
