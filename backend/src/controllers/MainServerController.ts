import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import { Replication } from "../models/Replication.js";
import axios from "axios";

class MainServerController {
  async getUserByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName } = req.body;
      const user = await Replication.findOne({ where: { firstName, lastName } });
      if (!user) {
        return next(ApiError.badRequest("User not found"));
      }
      const { domain } = await user.getDepartment();
      const result = await Promise.all([
        axios.get(domain + "/clients", { params: { id: user.id } }),
        axios.get(domain + "/balance", { params: { clientId: user.id } }),
        axios.get(domain + "/transactions", { params: { accountId: user.id } }),
      ]);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }
}

export default new MainServerController();
