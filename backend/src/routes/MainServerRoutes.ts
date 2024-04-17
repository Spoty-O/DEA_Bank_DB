import { Router } from "express";
import replicationRouter from "./ReplicationRoute.js";
const mainServerRoutes = Router();

mainServerRoutes.use("/replication", replicationRouter);

export default mainServerRoutes;
