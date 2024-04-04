import {
  AllowNull,
  BelongsToMany,
  Column,
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
} from "sequelize-typescript";
import { AccountTransaction } from "./AccountTransaction.js";
import { Client } from "./Client.js";
import { Department } from "./Departments.js";

interface BankAccountAttributes {
  id: number;
  balance: number;
  clientId: number;
  client: Client;
  departmentIdWhereOpen: number;
  department: Department;
  accountTransaction: AccountTransaction[];
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

  @HasMany(() => AccountTransaction)
  accountTransactions!: AccountTransaction[];
}
