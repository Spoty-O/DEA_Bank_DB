import ApiError from "../helpers/ApiErrors.js";
import { AccountTransaction, AccountTransactionAttributes } from "../models/AccountTransaction.js";
import { BankAccount } from "../models/BankAccount.js";

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

  async get_transactions(req, res, next) {
    //добавить типизацию
    try {
      const { accountId } = req.body;
      const transactions = await AccountTransaction.findAll({ where: { bankAccountId: accountId } });
      res.json(transactions);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest("Ошибка получения транзакций!"));
    }
  }

  async deposit(req, res, next) {
    try {
      const { accountId, amount } = req.body;
      const account = await BankAccount.findByPk(accountId);

      if (!account) {
        return next(ApiError.badRequest("Account not found!"));
      }

      await account.update({ balance: account.balance + amount });

      await AccountTransaction.create({
        amount,
        date: new Date(),
        transactionType: "deposit",
        bankAccountId: accountId,
        recipientBankAccountId: accountId,
      });

      res.json({ message: "Deposit successful" });
    } catch (error) {
      console.error("Deposit failed:", error.message);
      return next(ApiError.badRequest("Deposit failed!"));
    }
  }

  async withdraw(req, res, next) {
    try {
      const { accountId, amount } = req.body;
      const account = await BankAccount.findByPk(accountId);

      if (!account) {
        return next(ApiError.badRequest("Account not found!"));
      }

      if (account.balance < amount) {
        return next(ApiError.badRequest("Insufficient funds!"));
      }

      await account.update({ balance: account.balance - amount });

      await AccountTransaction.create({
        amount: -amount,
        date: new Date(),
        transactionType: "withdrawal",
        bankAccountId: accountId,
        recipientBankAccountId: accountId,
      });

      res.json({ message: "Withdrawal successful" });
    } catch (error) {
      console.error("Withdrawal failed:", error.message);
      return next(ApiError.badRequest("Withdrawal failed!"));
    }
  }

  async performTransfer(req, res, next) {
    try {
      // Получаем данные из запроса
      const { senderAccountId, recipientAccountId, amount } = req.body;

      // Находим банковские счета отправителя и получателя
      const senderAccount = await BankAccount.findByPk(senderAccountId);
      const recipientAccount = await BankAccount.findByPk(recipientAccountId);

      if (!senderAccount || !recipientAccount) {
        throw new Error("Sender or recipient account not found");
      }

      // Проверяем достаточность средств на счете отправителя
      if (senderAccount.balance < amount) {
        throw new Error("Insufficient funds");
      }

      // Получаем экземпляр sequelize
      const sequelize = BankAccount.sequelize;

      if (!sequelize || !sequelize.transaction) {
        throw new Error("Unable to start transaction");
      }

      // Начинаем транзакцию
      await sequelize.transaction(async (transaction) => {
        // Обновляем балансы отправителя и получателя
        await senderAccount.update({ balance: senderAccount.balance - amount }, { transaction });
        await recipientAccount.update({ balance: recipientAccount.balance + amount }, { transaction });

        // Создаем запись о транзакции списания средств
        await AccountTransaction.create(
          {
            amount: -amount,
            date: new Date(),
            transactionType: "transfer",
            bankAccountId: senderAccountId,
            recipientBankAccountId: recipientAccountId,
          },
          { transaction },
        );

        // Создаем запись о транзакции зачисления средств
        await AccountTransaction.create(
          {
            amount,
            date: new Date(),
            transactionType: "transfer",
            bankAccountId: recipientAccountId,
            recipientBankAccountId: senderAccountId,
          },
          { transaction },
        );
      });

      // Отправляем успешный ответ
      res.json({ message: "Transaction successful" });
    } catch (error) {
      // Обрабатываем ошибку
      console.error("Transaction failed:", error.message);
      return next(ApiError.badRequest("Transaction failed!"));
    }
  }
}

export default new AccountTransactionController();
