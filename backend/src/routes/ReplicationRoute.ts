import { Router } from "express";
import ReplicationController from "../controllers/ReplicationController.js";
const replicationRouter = Router();

replicationRouter.get("/client", ReplicationController.getUserByName, ReplicationController.createReplication);

export default replicationRouter;
