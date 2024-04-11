import { Router } from "express";
import AccountTransactionController from "../controllers/AccountTransactionController.js";
const transactionRouter = Router();

transactionRouter.get("/:accountId", AccountTransactionController.get_transactions);
transactionRouter.post("/deposit", AccountTransactionController.deposit);
transactionRouter.post("/withdraw", AccountTransactionController.withdraw);
transactionRouter.post("/transfer", AccountTransactionController.performTransfer);

export default transactionRouter;
