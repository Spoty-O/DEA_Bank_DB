import { Router } from "express";
import ReplicationController from "../controllers/ReplicationController.js";
import DepartmentController from "../controllers/DepartmentController.js";
import validation from "../middleware/validationMiddleware.js";
import { joiUserGetSchema } from "../schemas/ReplicationSchema.js";
import MainServerController from "../controllers/MainServerController.js";
import authDepartmentMiddleware from "../middleware/authDepartmentMiddleware.js";
import { joiBankAccountGetSchema } from "../schemas/BankSchema.js";
const replicationRouter = Router();

replicationRouter.get(
  "/client",
  validation(joiUserGetSchema),
  authDepartmentMiddleware,
  DepartmentController.getDepartmentByAPIKey,
  ReplicationController.getUserByName,
  DepartmentController.getDepartments,
  MainServerController.getFromDepartments,
  DepartmentController.getDepartmentByDomain,
  ReplicationController.createReplication,
);

replicationRouter.get(
  "/bankAccounts",
  validation(joiBankAccountGetSchema),
  authDepartmentMiddleware,
  DepartmentController.getDepartmentByAPIKey,
  ReplicationController.getBankAccountByClientId,
  DepartmentController.getDepartments,
  MainServerController.getFromDepartments,
);

export default replicationRouter;
