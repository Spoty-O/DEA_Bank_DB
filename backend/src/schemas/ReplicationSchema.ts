import Joi from "joi";

export const joiUserGetSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  noReplicate: Joi.boolean(),
}).meta({ className: "IUserValidated" });

// export { joiUserGetSchema };