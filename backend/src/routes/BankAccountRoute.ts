import { Router } from "express";
import BankAccountController from "../controllers/BankAccountController.js";
import { zodBankAccountGetSchema } from "../helpers/ZodSchemas/BankSchema.js";
import queryValidation from "../middleware/queryValidationMiddleware.js";
const bankAccountRouter = Router();

bankAccountRouter.get("/", queryValidation(zodBankAccountGetSchema), BankAccountController.getBankAccountByClientId, BankAccountController.getBankAccountFromMain);
bankAccountRouter.post("/", BankAccountController.createBankAccount);
bankAccountRouter.patch("/:id", BankAccountController.updateBankAccount);

export default bankAccountRouter;
