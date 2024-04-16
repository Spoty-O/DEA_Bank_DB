import { Router } from "express";
import ClientController from "../controllers/ClientController.js";
const clientRouter = Router();

clientRouter.get("/:id", ClientController.getClientById);
clientRouter.get("/find/:firstName&:lastName", ClientController.getClientByName);
clientRouter.get("/", ClientController.getAllClients);
clientRouter.post("/", ClientController.createClient);
clientRouter.patch("/:id", ClientController.updateClient);

export default clientRouter;
