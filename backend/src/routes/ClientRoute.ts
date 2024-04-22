import { Router } from "express";
import ClientController from "../controllers/ClientController.js";
import validation from "../middleware/validationMiddleware.js";
import { joiUserGetSchema } from "../helpers/joiSchems/replicationSchems.js";
const clientRouter = Router();

clientRouter.get("/find", validation(joiUserGetSchema), ClientController.getClientByName, ClientController.getClientFromMain);
// clientRouter.get("/:id", ClientController.getClientById);
clientRouter.get("/", ClientController.getAllClients);
clientRouter.post("/", ClientController.createClient);
clientRouter.patch("/:id", ClientController.updateClient);

export default clientRouter;
