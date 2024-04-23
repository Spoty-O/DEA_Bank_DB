import { NextFunction, Response } from "express";
import ApiError from "../helpers/ApiErrors.js";

const authDepartmentMiddleware = async (req: MyRequest, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    if (!req.headers.authorization) return next(ApiError.notAuth("APIKey missing"));
    const APIKey = req.headers.authorization.split(" ")[1];
    if (!APIKey) return next(ApiError.notAuth("APIKey missing"));
    req.APIKey = APIKey;
    next();
  } catch (error) {
    console.log(error);
    return next(ApiError.notAuth("APIKey missing"));
  }
};
export default authDepartmentMiddleware;
