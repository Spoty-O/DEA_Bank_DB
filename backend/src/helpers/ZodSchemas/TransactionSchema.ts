import Zod from "zod";
import { AccountTransactionAttributes } from "../../types/types.js";

const zodTransactionGetSchema = Zod.object({
  serverRequest: Zod.string().optional().transform((value) => (value ? "true" : "false")),
})

const zodTransactionCreateSchema = Zod.object({
  bankAccountId: Zod.string(),
  amount: Zod.number(),
})

type TTransactionGetValidated = Zod.infer<typeof zodTransactionGetSchema>;
type TTransactionCreateValidated = Zod.infer<typeof zodTransactionCreateSchema> & AccountTransactionAttributes;

export { zodTransactionGetSchema, TTransactionGetValidated, zodTransactionCreateSchema, TTransactionCreateValidated };
