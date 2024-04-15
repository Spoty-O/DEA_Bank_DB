import { Router } from "express";
import mainServerRouter from "./MainServerRoute.js";
const mainServerRoutes = Router();

mainServerRoutes.use('/client', mainServerRouter);

export default mainServerRoutes;