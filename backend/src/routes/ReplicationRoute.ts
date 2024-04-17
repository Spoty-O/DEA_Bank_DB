import { Router } from "express";
import ReplicationController from "../controllers/ReplicationController.js";
import DepartmentController from "../controllers/DepartmentController.js";
const replicationRouter = Router();

replicationRouter.get("/client/:firstName&:lastName", DepartmentController.getDepartments, ReplicationController.getUserByName, ReplicationController.createReplication);

export default replicationRouter;