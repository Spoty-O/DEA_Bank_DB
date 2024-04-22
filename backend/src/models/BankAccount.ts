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
import { BankAccountAttributes } from "../types/types.js";

@Table({
  timestamps: false,
})
export class BankAccount extends Model<BankAccountAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(15, 2))
  balance!: number;

  @ForeignKey(() => Client)
  @Column(DataType.UUID)
  clientId!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  replicated!: boolean;

  @BelongsTo(() => Client)
  client!: Client;

  @HasMany(() => AccountTransaction, { onDelete: "CASCADE" })
  accountTransactions!: AccountTransaction[];
}
