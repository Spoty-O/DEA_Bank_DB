import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import { Department } from "../models/Department.js";

class DepartmentsController {
  async initialize(): Promise<Department[]> {
    await Department.destroy({ cascade: true, truncate: true });
    return await Department.bulkCreate([
      { address: "123 Main St", city: "New York", phone: "123-456-7890", domain: "http://localhost:5001/" },
      { address: "456 Elm St", city: "New York", phone: "456-789-0123", domain: "http://localhost:5002/" },
    ]);
  }

  async getDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await Department.findAll();
      res.json(departments);
    } catch (error) {
      console.log(error)
      return next(ApiError.internal("Error getting departments"));
    }
  };
}

export default new DepartmentsController();
