import { AllowNull, Column, HasMany, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { AccountTransaction } from "./AccountTransaction.js";
import { Client } from "./Client.js";

export interface BankAccountAttributes {
  balance: number;
  clientId: number;
  departmentIdWhereOpen: number;
}

@Table({
  timestamps: false,
})
export class BankAccount extends Model<BankAccountAttributes> {
  @AllowNull(false)
  @Column(DataType.FLOAT(15, 2))
  balance!: number;

  @ForeignKey(() => Client)
  @Column(DataType.INTEGER)
  clientId!: number;

  @BelongsTo(() => Client)
  client!: Client;

  @HasMany(() => AccountTransaction, { onDelete: "CASCADE" })
  accountTransactions!: AccountTransaction[];
}
