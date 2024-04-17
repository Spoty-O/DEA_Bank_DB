import { Router } from "express";
import ReplicationController from "../controllers/ReplicationController.js";
import DepartmentController from "../controllers/DepartmentController.js";
import validation from "../middleware/validationMiddleware.js";
import { joiUserGetSchema } from "../helpers/joiSchems/replicationSchema.js";
import MainServerController from "../controllers/MainServerController.js";
const replicationRouter = Router();

replicationRouter.get(
  "/client",
  validation(joiUserGetSchema),
  DepartmentController.getDepartments,
  ReplicationController.getUserByName,
  MainServerController.getUserFromDepartment,
  ReplicationController.createReplication,
);

export default replicationRouter;
