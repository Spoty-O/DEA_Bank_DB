import { Router } from "express";
import ReplicationController from "../controllers/ReplicationController.js";
import DepartmentController from "../controllers/DepartmentController.js";
import { zodUserGetSchema } from "../helpers/ZodSchemas/UserSchema.js";
import MainServerController from "../controllers/MainServerController.js";
import authDepartmentMiddleware from "../middleware/authDepartmentMiddleware.js";
import queryValidation from "../middleware/queryValidationMiddleware.js";
// import { joiBankAccountGetSchema } from "../helpers/ZodSchemas/BankSchema.js";
const replicationRouter = Router();

replicationRouter.get(
  "/client",
  queryValidation(zodUserGetSchema),
  authDepartmentMiddleware,
  DepartmentController.getDepartmentByAPIKey,
  ReplicationController.getUserByName,
  DepartmentController.getDepartments,
  MainServerController.getFromDepartments,
  DepartmentController.getDepartmentByDomain,
  ReplicationController.createReplication,
);

// replicationRouter.get(
//   "/bankAccounts",
//   validation(joiBankAccountGetSchema),
//   authDepartmentMiddleware,
//   DepartmentController.getDepartmentByAPIKey,
//   ReplicationController.getBankAccountByClientId,
//   DepartmentController.getDepartments,
//   MainServerController.getFromDepartments,
// );

export default replicationRouter;
