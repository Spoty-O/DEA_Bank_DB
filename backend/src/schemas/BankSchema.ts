import Joi from "joi";

export const joiBankAccountGetSchema = Joi.object({
  clientId: Joi.string().required(),
  noReplicate: Joi.boolean(),
}).meta({ className: "IBankAccountValidated" });

// export { joiBankAccountGetSchema };
