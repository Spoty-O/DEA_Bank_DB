import { Department } from "./models/Department.ts";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
    }
  }
  namespace Express {
    interface Request {
      departmentList: Department[];
      recipientDepartment: Department;
      donorDepartment: Department;
      APIKey: string;
      reqURL: string;
      data: T;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
