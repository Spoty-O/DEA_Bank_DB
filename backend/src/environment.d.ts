import { Locals, Request } from "express";
import { Department } from "./models/Department.ts";
import { ParamsDictionary } from "express-serve-static-core";
import { RequestParamsGet, RequestQueryGet } from "./types/types.js";

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

  type MyRequest<P = ParamsDictionary, ReqQuery = qs.ParsedQs, ReqBody = undefined, T = undefined> = Request<
    RequestParamsGet<P>,
    JSON,
    ReqBody,
    RequestQueryGet<ReqQuery>,
    Locals
  > &
    MyLocals<T>;
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
