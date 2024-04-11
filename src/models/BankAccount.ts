import { AllowNull, Column, HasMany, Model, Table, DataType, ForeignKey, BelongsTo, PrimaryKey } from "sequelize-typescript";
import { AccountTransaction } from "./AccountTransaction.js";
import { Client } from "./Client.js";

export interface BankAccountAttributes {
  id: string;
  balance: number;
  clientId: string;
}

@Table({
  timestamps: false,
})
export class BankAccount extends Model<BankAccountAttributes> {
  @PrimaryKey
  @Column(DataType.STRING(40))
  id!: string;

  @AllowNull(false)
  @Column(DataType.FLOAT(15, 2))
  balance!: number;
  
  @ForeignKey(() => Client)
  @Column(DataType.STRING(40))
  clientId!: string;

  @BelongsTo(() => Client)
  client!: Client;

  @HasMany(() => AccountTransaction, { onDelete: "CASCADE" })
  accountTransactions!: AccountTransaction[];
}
