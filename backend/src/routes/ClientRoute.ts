import { Router } from "express";
import ClientController from "../controllers/ClientController.js";
import { zodUserCreateSchema, zodUserGetSchema } from "../helpers/ZodSchemas/UserSchema.js";
import queryValidation from "../middleware/queryValidationMiddleware.js";
import bodyValidation from "../middleware/bodyValidationMiddleware.js";
const clientRouter = Router();

clientRouter.get("/find", queryValidation(zodUserGetSchema), ClientController.getClientByName, ClientController.getClientFromMain, ClientController.createClient);
clientRouter.get("/find/replication", queryValidation(zodUserGetSchema), ClientController.getClientByName, ClientController.updateClient);
clientRouter.get("/", ClientController.getAllClients);
clientRouter.post("/", bodyValidation(zodUserCreateSchema), ClientController.createClient);
clientRouter.patch("/:id", bodyValidation(zodUserCreateSchema), ClientController.updateClient, ClientController.updateReplicationsForClient);

export default clientRouter;
