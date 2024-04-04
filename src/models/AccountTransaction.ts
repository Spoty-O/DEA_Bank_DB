import {
  AllowNull,
  BelongsToMany,
  CreatedAt,
  Default,
  HasMany,
  HasOne,
  Model,
  Table,
  Unique,
  UpdatedAt,
  DataType,
  ForeignKey,
  BelongsTo,
  Column,
} from "sequelize-typescript";
import { BankAccount } from "./BankAccount.js";

interface AccountTransactionAttributes {
  id: number;
  amount: number;
  date: Date;
  transactionType: string;
  bankAccountId: number;
  bankAccount: BankAccount;
  recipientBankAccountId: number;
  recipientBankAccount: BankAccount;
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
  @Column(DataType.INTEGER)
  bankAccountId!: number;

  @BelongsTo(() => BankAccount)
  bankAccount!: BankAccount;

  @ForeignKey(() => BankAccount)
  @Column(DataType.INTEGER)
  recipientBankAccountId!: number;

  @BelongsTo(() => BankAccount)
  recipientBankAccount!: BankAccount;
}