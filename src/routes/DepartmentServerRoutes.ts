import { Router } from "express";
import clientRouter from "./ClientRoute.js";
import bankAccountRouter from "./BankAccountRoute.js";
const departmentServerRoutes = Router();

departmentServerRoutes.use("/clients", clientRouter);
departmentServerRoutes.use("/balance", bankAccountRouter);

export default departmentServerRoutes;
