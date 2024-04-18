import Joi from "joi";

const joiUserGetSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    noReplicate: Joi.boolean(),
});

export {
    joiUserGetSchema,
};