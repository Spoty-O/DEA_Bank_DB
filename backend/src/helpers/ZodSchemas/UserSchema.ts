import Zod from "zod";
import { ClientAttributes } from "../../types/types.js";

const zodUserGetSchema = Zod.object({
  firstName: Zod.string().min(3).max(50),
  lastName: Zod.string().min(3).max(50),
  serverRequest: Zod.string().optional().transform((value) => (value ? "true" : "false")),
});

const zodUserCreateSchema = Zod.object({
  firstName: Zod.string().min(3).max(50),
  lastName: Zod.string().min(3).max(50),
  phone: Zod.string().regex(/^\d{3}-\d{3}-\d{4}$/),
});

type TClientGetValidated = Zod.infer<typeof zodUserGetSchema>;
type TClientCreateValidated = Zod.infer<typeof zodUserCreateSchema> & ClientAttributes;

export { zodUserGetSchema, zodUserCreateSchema, TClientGetValidated, TClientCreateValidated };
