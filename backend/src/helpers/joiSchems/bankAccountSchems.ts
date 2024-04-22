import Joi from "joi";

const joiBankAccountGetSchema = Joi.object({
    clientId: Joi.string().required(),
    noReplicate: Joi.boolean(),
});

export {
    joiBankAccountGetSchema,
};