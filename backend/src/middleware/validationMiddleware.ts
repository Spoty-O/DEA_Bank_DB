import * as Joi from "types-joi";
import { Response, NextFunction } from "express";
import ApiError from "../helpers/ApiErrors.js";

const validation = <T>(schema: Joi.ObjectSchema<T>) => (req: MyRequest<undefined, T>, res: Response, next: NextFunction) => {
  const { error, value } = schema.validate(req.query);
  if (error) {
    return next(ApiError.conflict("Validation error: " + error.details[0].message));
  }
  req.query = value
  next();
};

export default validation;
