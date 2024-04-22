import { Router } from "express";
import BankAccountController from "../controllers/BankAccountController.js";
import validation from "../middleware/validationMiddleware.js";
import { joiBankAccountGetSchema } from "../schemas/BankSchema.js";
const bankAccountRouter = Router();

bankAccountRouter.get("/", validation(joiBankAccountGetSchema), BankAccountController.getBankAccountByClientId, BankAccountController.getBankAccountFromMain);
bankAccountRouter.post("/", BankAccountController.createBankAccount);
bankAccountRouter.patch("/:id", BankAccountController.updateBankAccount);

export default bankAccountRouter;
