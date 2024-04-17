import Joi, { ValidationResult } from "joi";
import { Request, Response, NextFunction } from "express";
import ApiError from "../helpers/ApiErrors.js";
import { RequestQuery } from "../types/types.js";

const validation = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error, value }: ValidationResult<RequestQuery> = schema.validate(req.query);
  if (error) {
    return next(ApiError.conflict("Validation error: " + error.details[0].message));
  }
  req.validatedQuery = value;
  next();
};

export default validation;
