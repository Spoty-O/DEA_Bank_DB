import { AllowNull, Model, Table, DataType, ForeignKey, BelongsTo, Column } from "sequelize-typescript";
import { BankAccount } from "./BankAccount.js";
import { Optional } from "sequelize";
import { AccountTransactionAttributes } from "../types/types.js";

export interface AccountTransactionCreationAttributes extends Optional<AccountTransactionAttributes, "id"> {}

@Table({
  timestamps: false,
})
export class AccountTransaction extends Model<AccountTransactionAttributes, AccountTransactionCreationAttributes> {
  @AllowNull(false)
  @Column(DataType.FLOAT(15, 2))
  amount!: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  date!: Date;

  @AllowNull(false)
  @Column(DataType.STRING(40))
  transactionType!: string;

  @ForeignKey(() => BankAccount)
  @Column(DataType.STRING(40))
  bankAccountId!: string;

  @BelongsTo(() => BankAccount)
  bankAccount!: BankAccount;

  @ForeignKey(() => BankAccount)
  @Column(DataType.STRING(40))
  recipientBankAccountId!: string;

  @BelongsTo(() => BankAccount)
  recipientBankAccount!: BankAccount;
}
