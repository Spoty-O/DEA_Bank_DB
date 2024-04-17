import { AllowNull, Model, Table, DataType, ForeignKey, BelongsTo, Column, PrimaryKey } from "sequelize-typescript";
import { BankAccount } from "./BankAccount.js";
import { AccountTransactionAttributes } from "../types/types.js";

@Table({
  timestamps: false,
})
export class AccountTransaction extends Model<AccountTransactionAttributes> {
  @PrimaryKey
  @Column(DataType.STRING(40))
  id!: string;

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
