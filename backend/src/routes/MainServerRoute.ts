import { Router } from "express";
import MainServerController from "../controllers/MainServerController.js";
const mainServerRouter = Router();

mainServerRouter.get("/:id", MainServerController.getUserByName);

export default mainServerRouter;
