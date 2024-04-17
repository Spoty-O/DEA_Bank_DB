import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import { AccountTransaction } from "../models/AccountTransaction.js";
import { BankAccount } from "../models/BankAccount.js";
import { v4 as uuidv4 } from "uuid";
import { AccountTransactionCreationAttributes } from "../types/types.js";

class AccountTransactionController {
  async initialize(bankAccounts: BankAccount[]): Promise<AccountTransaction[]> {
    const accountTransactionsValues: AccountTransactionCreationAttributes[] = [];
    for (const bankAccount of bankAccounts) {
      accountTransactionsValues.push({
        id: uuidv4(),
        amount: 500,
        date: new Date(),
        transactionType: "transfer",
        bankAccountId: bankAccount.id,
        recipientBankAccountId: bankAccount.id,
      });
    }
    return await AccountTransaction.bulkCreate(accountTransactionsValues);
  }

  async get_transactions(req: Request, res: Response, next: NextFunction) {
    //добавить типизацию
    try {
      const { accountId } = req.params;

      if (!accountId) {
        return next(ApiError.badRequest("accountId are required"));
      }

      const transactions = await AccountTransaction.findAll({ where: { bankAccountId: accountId } });
      res.json(transactions);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest("Ошибка получения транзакций!"));
    }
  }

  async deposit(req: Request, res: Response, next: NextFunction) {
    try {
      const { bankAccountId, amount } = req.body;

      if (!bankAccountId || !amount) {
        return next(ApiError.badRequest("bankAccountId and amount are required"));
      }

      if (!Number(amount)) next(ApiError.badRequest("Amount is not a number"));

      const account = await BankAccount.findOne({ where: { id: bankAccountId } });

      if (!account) {
        return next(ApiError.badRequest("Account not found!"));
      }

      await account.update({ balance: account.balance + Number(amount) });

      await AccountTransaction.create({
        id: uuidv4(),
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

  async withdraw(req: Request, res: Response, next: NextFunction) {
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

      if (account.balance < Number(amount)) {
        return next(ApiError.badRequest("Insufficient funds!"));
      }

      await account.update({ balance: account.balance - Number(amount) });

      await AccountTransaction.create({
        id: uuidv4(),
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

  async performTransfer(req: Request, res: Response, next: NextFunction) {
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
      if (senderAccount.balance < Number(amount)) {
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
        await senderAccount.update({ balance: senderAccount.balance - Number(amount) }, { transaction });
        await recipientAccount.update({ balance: recipientAccount.balance + Number(amount) }, { transaction });

        // Создаем запись о транзакции списания средств
        await AccountTransaction.create(
          {
            id: uuidv4(),
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
            id: uuidv4(),
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
      res.json({ message: "Transaction successful" });
    } catch (error) {
      // Обрабатываем ошибку
      console.error("Transaction failed:", error);
      return next(ApiError.badRequest("Transaction failed!"));
    }
  }
}

export default new AccountTransactionController();
