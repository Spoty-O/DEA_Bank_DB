import { Locals, Request } from "express";
import { Department } from "./models/Department.ts";
import { ParamsDictionary } from "express-serve-static-core";
// import { RequestQueryGet } from "./types/types.js";

interface MyLocals<T> {
  departmentList?: Department[];
  recipientDepartment?: Department;
  donorDepartment?: Department;
  APIKey?: string;
  reqURL?: string;
  data?: T;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
    }
  }

  type MyRequest<P = ParamsDictionary, ReqQuery = qs.ParsedQs, ReqBody = unknown, T = undefined> = Request<
    P,
    JSON,
    ReqBody,
    ReqQuery,
    Locals
  > &
    MyLocals<T>;
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
