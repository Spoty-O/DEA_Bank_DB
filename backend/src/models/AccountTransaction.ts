import { AllowNull, Model, Table, DataType, ForeignKey, BelongsTo, Column, PrimaryKey, Default } from "sequelize-typescript";
import { BankAccount } from "./BankAccount.js";
import { AccountTransactionAttributes, AccountTransactionCreationAttributes } from "../types/types.js";

@Table({
  timestamps: false,
})
export class AccountTransaction extends Model<AccountTransactionAttributes, AccountTransactionCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(15, 2))
  amount!: number;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  date!: Date;

  @AllowNull(false)
  @Column(DataType.STRING(40))
  transactionType!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  replicated!: boolean;

  @ForeignKey(() => BankAccount)
  @Column(DataType.UUID)
  bankAccountId!: string;

  @BelongsTo(() => BankAccount)
  bankAccount!: BankAccount;

  @ForeignKey(() => BankAccount)
  @Column(DataType.UUID)
  recipientBankAccountId!: string;

  @BelongsTo(() => BankAccount)
  recipientBankAccount!: BankAccount;
}
