import Zod from "zod";
import { BankAccountAttributes } from "../../types/types.js";

const zodBankAccountGetSchema = Zod.object({
  serverRequest: Zod.string().optional().transform((value) => (value ? "true" : "false")),
})

const zodBankAccountCreateSchema = Zod.object({
  clientId: Zod.string(),
  balance: Zod.number(),
})

type TBankAccountGetValidated = Zod.infer<typeof zodBankAccountGetSchema>;
type TBankAccountCreateValidated = Zod.infer<typeof zodBankAccountCreateSchema> & BankAccountAttributes;

export { zodBankAccountGetSchema, TBankAccountGetValidated, zodBankAccountCreateSchema, TBankAccountCreateValidated };
