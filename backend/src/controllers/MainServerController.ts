import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { Client } from "../models/Client.js";

class MainServerController {
  async getUserFromDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { domain } = req.department;
      const { clientId } = req.replicationData;
      const { data } = await axios.get<Client>(domain + "/clients", { params: { id: clientId } });
      return res.json(data);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  async getUserFromDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const { domain } = req.department;
      const { clientId } = req.replicationData;
      const { data } = await axios.get<Client>(domain + "/clients", { params: { id: clientId } });
      return res.json(data);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  // async getUserF
}

export default new MainServerController();
