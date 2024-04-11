import { Router } from "express";
import BankAccountController from "../controllers/BankAccountController.js";
const bankAccountRouter = Router();

bankAccountRouter.get("/:id", BankAccountController.getBankAccount);
bankAccountRouter.post("/", BankAccountController.createBankAccount);
bankAccountRouter.patch("/:id", BankAccountController.updateBankAccount);

export default bankAccountRouter;