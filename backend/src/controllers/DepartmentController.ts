import ApiError from "../helpers/ApiErrors.js";
import { Response, NextFunction } from "express";
import { Department } from "../models/Department.js";
import { AxiosResponse } from "axios";
import { ReplicationAttributes } from "../types/types.js";

class DepartmentController {
  static async initialize(): Promise<Department[]> {
    return await Department.bulkCreate([
      { address: "123 Main St", city: "New York", phone: "123-456-7890", domain: "http://localhost:5001/api" },
      { address: "456 Elm St", city: "New York", phone: "456-789-0123", domain: "http://localhost:5002/api" },
    ]);
  }

  static async getDepartments(req: MyRequest, res: Response, next: NextFunction) {
    try {
      const departments = await Department.findAll();
      req.departmentList = departments;
      next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting departments"));
    }
  }

  static async getDepartmentByAPIKey(req: MyRequest, res: Response, next: NextFunction) {
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

  static async getDepartmentByDomain(
    req: MyRequest<unknown, unknown, unknown, AxiosResponse>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.data?.config.url) {
        return next(ApiError.notFound("Department URL not found"));
      }
      const { url } = req.data.config;
      const department = await Department.findOne({
        where: { domain: url.substring(0, url.indexOf("/api") + 4) },
      });
      if (!department) {
        return next(ApiError.notFound("Department by domain not found"));
      }
      req.donorDepartment = department;
      next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting departments"));
    }
  }

  static async getDepartmentsByReplication(
    req: MyRequest<unknown, unknown, unknown, ReplicationAttributes>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.data) {
        return next(ApiError.internal("Replication data not found"));
      }
      const { donorDepartmentId } = req.data;
      const departments = await Department.findAll({ where: { id: donorDepartmentId } });
      req.departmentList = departments;
      next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting departments"));
    }
  }
}

export default DepartmentController;
