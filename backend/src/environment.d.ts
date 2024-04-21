import { Department } from "./models/Department.ts";
import { Replication } from "./models/Replication.ts";
import { Query } from 'express-serve-static-core';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
    }
  }
  namespace Express {
    interface Request {
      replicationData: Replication | null;
      departmentList: Department[];
      recipientDepartment: Department;
      donorDepartment: Department;
      APIKey: string;
      reqURL: string;
    }
  }
  interface ExtendedRequest<Body = undefined, QueryType extends Query, Data = undefined> extends Express.Request {
    body: Body;
    query: QueryType;
    data: Data; // Используем определенный тип
  };
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
