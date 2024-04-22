import { Router } from "express";
import clientRouter from "./ClientRoute.js";
import bankAccountRouter from "./BankAccountRoute.js";
import transactionRouter from "./TransactionRoute.js";
const departmentServerRoutes = Router();

departmentServerRoutes.use("/clients", clientRouter);
departmentServerRoutes.use("/bankAccounts", bankAccountRouter);
departmentServerRoutes.use("/transactions", transactionRouter);

export default departmentServerRoutes;
