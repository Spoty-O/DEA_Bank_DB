import ApiError from "../helpers/ApiErrors.js";
import { Request, Response, NextFunction } from "express";
import { Department } from "../models/Department.js";

class DepartmentsController {
  static async initialize(): Promise<Department[]> {
    return await Department.bulkCreate([
      { address: "123 Main St", city: "New York", phone: "123-456-7890", domain: "http://localhost:5001/api" },
      { address: "456 Elm St", city: "New York", phone: "456-789-0123", domain: "http://localhost:5002/api" },
    ]);
  }

  static async getDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await Department.findAll();
      req.departmentList = departments;
      next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting departments"));
    }
  }

  static async getDepartmentByAPIKey(req: Request, res: Response, next: NextFunction) {
    try {
      const department = await Department.findOne({ where: { APIKey: req.APIKey } });
      if (!department) {
        return next(ApiError.notFound("Department by APIKey not found"));
      }
      req.recipientDepartment = department;
      next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting departments"));
    }
  }
}

export default DepartmentsController;
