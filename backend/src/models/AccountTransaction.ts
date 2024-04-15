import { AllowNull, Model, Table, DataType, ForeignKey, BelongsTo, Column } from "sequelize-typescript";
import { BankAccount } from "./BankAccount.js";

export interface AccountTransactionAttributes {
  amount: number;
  date: Date;
  transactionType: string;
  bankAccountId: string;
  recipientBankAccountId: string;
}

@Table({
  timestamps: false,
})
export class AccountTransaction extends Model<AccountTransactionAttributes> {
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
