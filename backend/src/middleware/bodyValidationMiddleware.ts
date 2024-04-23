import { ZodError, ZodSchema } from "zod";
import { Response, NextFunction } from "express";
import ApiError from "../helpers/ApiErrors.js";

const bodyValidation = (schema: ZodSchema) => (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      let errorMessages = "";
      error.issues.forEach((issue) => {
        errorMessages += `Field "${issue.path}": ${issue.message}\n`;
      });
      return next(ApiError.badRequest(errorMessages));
    }
    console.log(error)
    return next(ApiError.internal("Input field validation error"));
  }
};

export default bodyValidation;
