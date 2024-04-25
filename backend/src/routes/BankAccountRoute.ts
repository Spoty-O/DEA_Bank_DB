import { Router } from "express";
import BankAccountController from "../controllers/BankAccountController.js";
import { zodBankAccountGetSchema } from "../helpers/ZodSchemas/BankSchema.js";
import queryValidation from "../middleware/queryValidationMiddleware.js";
const bankAccountRouter = Router();

bankAccountRouter.get("/:clientId", queryValidation(zodBankAccountGetSchema), BankAccountController.getBankAccountByClientId, BankAccountController.getBankAccountFromMain, BankAccountController.createBankAccount);
bankAccountRouter.post("/", BankAccountController.createBankAccount);
bankAccountRouter.patch("/:id", BankAccountController.updateBankAccount, BankAccountController.updateReplicationsForBankAccount);

export default bankAccountRouter;
