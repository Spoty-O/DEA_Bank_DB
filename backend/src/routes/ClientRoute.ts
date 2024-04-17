import { Router } from "express";
import ClientController from "../controllers/ClientController.js";
import validation from "../middleware/validationMiddleware.js";
import { joiUserGetSchema } from "../helpers/joiSchems/replicationSchema.js";
const clientRouter = Router();

// clientRouter.get("/:id", ClientController.getClientById);
clientRouter.get("/find", validation(joiUserGetSchema), ClientController.getClientByName);
clientRouter.get("/", ClientController.getAllClients);
clientRouter.post("/", ClientController.createClient);
clientRouter.patch("/:id", ClientController.updateClient);

export default clientRouter;
