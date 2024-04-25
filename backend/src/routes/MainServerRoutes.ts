import { Router } from "express";
import queryValidation from "../middleware/queryValidationMiddleware.js";
import { zodUserGetSchema } from "../helpers/ZodSchemas/UserSchema.js";
import authDepartmentMiddleware from "../middleware/authDepartmentMiddleware.js";
import DepartmentController from "../controllers/DepartmentController.js";
import MainServerController from "../controllers/MainServerController.js";
import ReplicationController from "../controllers/ReplicationController.js";
const mainServerRoutes = Router();

mainServerRoutes.get(
  "/replication/client",
  authDepartmentMiddleware,
  queryValidation(zodUserGetSchema),
  DepartmentController.getDepartmentByAPIKey,
  DepartmentController.getDepartments,
  MainServerController.getFromDepartments("/clients/find/replication"),
  DepartmentController.getDepartmentByDomain,
  ReplicationController.createReplication,
);

mainServerRoutes.patch(
  "/replication/client/:id",
  authDepartmentMiddleware,
  DepartmentController.getDepartmentByAPIKey,
  ReplicationController.getReplicationInfo,
  DepartmentController.getDepartmentsByReplication,
  MainServerController.patchToDepartments("/clients"),
);

mainServerRoutes.get(
  "/replication/bankAccounts/:id",
  authDepartmentMiddleware,
  DepartmentController.getDepartmentByAPIKey,
  ReplicationController.getReplicationInfo,
  DepartmentController.getDepartmentsByReplication,
  MainServerController.getFromDepartments("/bankAccounts"),
);

mainServerRoutes.patch(
  "/replication/bankAccounts/:id",
  authDepartmentMiddleware,
  DepartmentController.getDepartmentByAPIKey,
  ReplicationController.getReplicationInfo,
  DepartmentController.getDepartmentsByReplication,
  MainServerController.patchToDepartments("/bankAccounts"),
);

mainServerRoutes.get(
  "/replication/transactions/:id",
  authDepartmentMiddleware,
  DepartmentController.getDepartmentByAPIKey,
  ReplicationController.getReplicationInfo,
  DepartmentController.getDepartmentsByReplication,
  MainServerController.getFromDepartments("/transactions"),
);

export default mainServerRoutes;
