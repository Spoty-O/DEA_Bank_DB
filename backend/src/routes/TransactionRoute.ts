import { Router } from "express";
import AccountTransactionController from "../controllers/AccountTransactionController.js";
import BankAccountController from "../controllers/BankAccountController.js";
const transactionRouter = Router();

transactionRouter.get(
  "/:bankAccountId",
  AccountTransactionController.getTransactions,
  BankAccountController.getClientByBankAccountId,
  AccountTransactionController.getTransactionsFromMain,
  AccountTransactionController.createTransaction,
);
transactionRouter.post("/deposit", AccountTransactionController.deposit);
transactionRouter.post("/withdraw", AccountTransactionController.withdraw);
transactionRouter.post("/transfer", AccountTransactionController.performTransfer);

export default transactionRouter;
