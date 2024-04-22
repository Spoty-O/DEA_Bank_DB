import Zod from "zod";

const zodBankAccountGetSchema = Zod.object({
  clientId: Zod.string(),
  serverRequest: Zod.boolean().transform((value) => (value ? "true" : "false")),
})

type TBankAccountValidated = Zod.infer<typeof zodBankAccountGetSchema>;

export { zodBankAccountGetSchema, TBankAccountValidated };
