import {
  AllowNull,
  Column,
  HasMany,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Default,
} from "sequelize-typescript";
import { AccountTransaction } from "./AccountTransaction.js";
import { Client } from "./Client.js";
import { BankAccountAttributes, BankAccountCreationAttributes } from "../types/types.js";

@Table({
  timestamps: false,
})
export class BankAccount extends Model<BankAccountAttributes, BankAccountCreationAttributes> {
  @PrimaryKey
  @Column(DataType.STRING(40))
  id!: string;

  @AllowNull(false)
  @Column(DataType.FLOAT(15, 2))
  balance!: number;

  @ForeignKey(() => Client)
  @Column(DataType.STRING(40))
  clientId!: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  @Default(false)
  replicated!: boolean;

  @BelongsTo(() => Client)
  client!: Client;

  @HasMany(() => AccountTransaction, { onDelete: "CASCADE" })
  accountTransactions!: AccountTransaction[];
}
