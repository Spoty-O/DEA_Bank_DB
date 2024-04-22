import Joi from "joi";

const joiBankAccountGetSchema = Joi.object({
    clientId: Joi.string().required(),
});

export {
    joiBankAccountGetSchema,
};