import { Router } from "express";
import ReplicationController from "../controllers/ReplicationController.js";
import DepartmentController from "../controllers/DepartmentController.js";
import validation from "../middleware/validationMiddleware.js";
import { joiUserGetSchema } from "../helpers/joiSchems/replicationSchema.js";
import MainServerController from "../controllers/MainServerController.js";
import authDepartmentMiddleware from "../middleware/authDepartmentMiddleware.js";
const replicationRouter = Router();

replicationRouter.get(
  "/client",
  validation(joiUserGetSchema),
  authDepartmentMiddleware,
  DepartmentController.getDepartmentByAPIKey,
  ReplicationController.getUserByName,
  DepartmentController.getDepartments,
  MainServerController.getUserFromDepartment,
  ReplicationController.createReplication,
);

export default replicationRouter;
