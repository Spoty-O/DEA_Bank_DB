import { ZodError, ZodSchema } from "zod";
import { Response, NextFunction } from "express";
import ApiError from "../helpers/ApiErrors.js";

const queryValidation = (schema: ZodSchema) => (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.query);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      let errorMessages = "";
      error.issues.forEach((issue) => {
        errorMessages += `Field <<${issue.path}>>: ${issue.message}`;
      });
      return next(ApiError.badRequest(errorMessages));
    }
    console.log(error)
    return next(ApiError.internal("Input field validation error"));
  }
};

export default queryValidation;
