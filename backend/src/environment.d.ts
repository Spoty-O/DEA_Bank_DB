import { Department } from "./models/Department.ts";
import { Replication } from "./models/Replication.ts";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
    }
  }
  namespace Express {
    interface Request {
      replicationData: Replication;
      department: Department;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
