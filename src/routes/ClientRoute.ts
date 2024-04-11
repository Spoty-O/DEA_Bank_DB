import { Router } from "express";
import ClientController from "../controllers/ClientController.js";
const clientRouter = Router();

clientRouter.get("/:id", ClientController.getClient);
clientRouter.get("/", ClientController.getAllClients);
clientRouter.post("/", ClientController.createClient);
clientRouter.patch("/:id", ClientController.updateClient);

export default clientRouter;
