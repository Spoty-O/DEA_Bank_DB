import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import ApiError from "../helpers/ApiErrors.js";

const validation = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.query);
  if (error) {
    return next(ApiError.conflict("Validation error: " + error.details[0].message));
  }
  next();
};

export default validation;
