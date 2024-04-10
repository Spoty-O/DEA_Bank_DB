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
        transactionType: "Перевод",
        bankAccountId: bankAccount.id,
        recipientBankAccountId: bankAccount.id,
      });
    }
    return await AccountTransaction.bulkCreate(accountTransactionsValues);
  }

  async get_transactions(req, res, next) {
    //добавить типизацию
    try {
      const { id } = req.account;
      const transactions = await AccountTransaction.findAll({ where: { bankAccountId: id } });
      res.json(transactions);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest("Ошибка получения транзакций!"));
    }
  }

  async transferController(req, res, next) {
    try {
      // Получаем данные из запроса
      const { senderAccountId, recipientAccountId, amount } = req.body;
      // Начинаем транзакцию
      await BankAccount.sequelize?.transaction(async (transaction) => {
        // Находим банковские счета отправителя и получателя
        const senderAccount = await BankAccount.findByPk(senderAccountId, { transaction });
        const recipientAccount = await BankAccount.findByPk(recipientAccountId, { transaction });

        if (!senderAccount || !recipientAccount) {
          throw new Error("Sender or recipient account not found");
        }

        // Проверяем достаточность средств на счете отправителя
        if (senderAccount.balance < amount) {
          throw new Error("Insufficient funds");
        }

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

      console.log("Transaction successful");
    } catch (error) {
      console.error("Transaction failed:", error.message);
      throw error;
    }
  }
}

export default new AccountTransactionController();
